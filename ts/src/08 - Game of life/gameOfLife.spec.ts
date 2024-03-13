class Board {
    private aliveCells = new Set<string>();

    addCell(x: number, y: number): void {
        this.aliveCells.add(`${x},${y}`);
    }

    isCellAlive(x: number, y: number): boolean {
        return this.aliveCells.has(`${x},${y}`);
    }
}

class GameOfLife {
    private aliveCells = new Board();

    private generation: number;
    private readonly width: number;
    private readonly height: number;

    constructor(initialBoard: string) {
        const [generation, dimensions, ...board] = initialBoard.split('\n');
        this.generation = Number(generation.split(' ')[1].replace(':', ''));
        const [width, height] = dimensions.split(' ').map(Number);
        this.width = width;
        this.height = height;

        this.parseInitialBoard(board);
    }

    private parseInitialBoard(board: string[]) {
        board.forEach((row, i) => {
            row.split('').forEach((cell, j) => {
                if (cell === '*') {
                    this.aliveCells.addCell(i, j);
                }
            });
        });
    }

    nextRound(): void {
        ++this.generation;
        const nextAliveCells = new Board();
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const neighbors = this.countNeighbors(i, j);
                if (neighbors === 3 || (neighbors === 2 && this.aliveCells.isCellAlive(i, j))) {
                    nextAliveCells.addCell(i, j);
                }
            }
        }
        this.aliveCells = nextAliveCells;
    }

    getBoard(): string {
        let board = `Generation ${this.generation}:\n${this.width} ${this.height}\n`;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                board += this.aliveCells.isCellAlive(i,j) ? '*' : '.';
            }
            board += '\n';
        }
        return board.substring(0, board.length - 1);
    }

    private countNeighbors(x: number, y: number) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (this.aliveCells.isCellAlive(x + i,y + j)) {
                    count++;
                }
            }
        }
        return count;
    }
}

function checkResultMatches(actual: string, expected: string) {
    const actualLines = actual.split('\n');
    const expectedLines = expected.split('\n');
    expect(actualLines.length).toBe(expectedLines.length);

    // Same generation
    expect(actualLines[0]).toBe(expectedLines[0]);
    // Same dimension
    expect(actualLines[1]).toBe(expectedLines[1]);

    const errors = [];
    for (let i = 2; i < actualLines.length; i++) {
        const actualLine = actualLines[i];
        const expectedLine = expectedLines[i];

        for (let j = 0; j < actualLine.length; j++) {
            if (expectedLine[j] === '?') continue;
            if (actualLine[j] !== expectedLine[j]) {
                errors.push(`At (${i}, ${j + 1}): expected ${expectedLine[j]}, got ${actualLine[j]}`);
            }
        }
    }
    expect(errors).toEqual([]);
}

describe('GameOfLife', () => {
    it('should return same board if nextRound is not called', () => {
        const initialBoard = 'Generation 1:\n1 3\n...';
        const game = new GameOfLife(initialBoard);

        const result = game.getBoard();

        expect(result).toBe(initialBoard);
    });

    it('should kill any cell with less than 1 neighbor in next generation', () => {
        const initialBoard = 'Generation 1:\n2 3\n*.*\n..*';
        const game = new GameOfLife(initialBoard);

        game.nextRound();

        const result = game.getBoard();
        checkResultMatches(result, 'Generation 2:\n2 3\n.?.\n??.');
    });

    it('should kill any cell with more than 3 neighbors in next generation', () => {
        const initialBoard = 'Generation 1:\n3 3\n***\n***\n***';
        const game = new GameOfLife(initialBoard);

        game.nextRound();

        const result = game.getBoard();
        checkResultMatches(result, 'Generation 2:\n3 3\n?.?\n...\n?.?');
    });

    it('should keep cells with 2 or 3 neighbors in the next generation', () => {
        const initialBoard = 'Generation 1:\n3 3\n***\n***\n***';
        const game = new GameOfLife(initialBoard);

        game.nextRound();

        const result = game.getBoard();
        checkResultMatches(result, 'Generation 2:\n3 3\n*?*\n???\n*?*');
    });

    it('should spawn new cells where there are exactly three alive neighbors in the next generation', () => {
        const initialBoard = 'Generation 1:\n3 3\n***\n...\n...';
        const game = new GameOfLife(initialBoard);

        game.nextRound();

        const result = game.getBoard();
        checkResultMatches(result, 'Generation 2:\n3 3\n???\n?*?\n???');
    });
});
