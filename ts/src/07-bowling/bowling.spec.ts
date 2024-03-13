const SPARE_SYMBOL = '/';
const STRIKE_SYMBOL = 'X';

const NB_PINS = 10;

class BowlingService {
    getScore(framesStr: string): number {
        const frames = framesStr.split(" ");
        return frames.map((frame, index) => {
            return this.getFrameScore(frame, frames, index );
        }).reduce((prev: number, curr: number) => prev + curr, 0);
    }

    private getFrameScore(frame: string, frames: string[], index: number): number {
        if (this.isStrike(frame)) {
            const nextFrame = frames[index + 1];
            if (this.isSpare(nextFrame)) {
                return 2 * NB_PINS;
            }
            return NB_PINS + this.getThrowScore(nextFrame[0]) + this.getThrowScore(nextFrame[1])
        }
        else if (this.isSpare(frame)) {
            const nextFrame = frames[index + 1];
            return NB_PINS + this.getThrowScore(nextFrame[0]);
        } else {
            const firstThrow = frame[0];
            const secondThrow = frame[1];

            return this.getThrowScore(firstThrow) + this.getThrowScore(secondThrow);
        }
    }

    private isStrike(frame: string): boolean {
        return frame[0] === STRIKE_SYMBOL;
    }

    private isSpare(frame: string) {
        return frame[1] === SPARE_SYMBOL;
    }

    private getThrowScore(aThrow: string) {
        if (aThrow === STRIKE_SYMBOL){
            return NB_PINS;
        }
        return isNaN(+aThrow) ? 0 : +aThrow;
    }
}

describe('Bowling kata', () => {
    let service: BowlingService;

    beforeEach(() => {
        service = new BowlingService();
    })

    it('should return 0 if all rolls are 0', () => {
        const result = service.getScore("-- -- -- -- -- -- -- -- -- --");

        expect(result).toBe(0);
    });

    it('should return the score of one throw if only one hits', () => {
        const result = service.getScore("2- -- -- -- -- -- -- -- -- --");

        expect(result).toBe(2);
    });

    it('should add all the throws as long as there is no strike or spare', () => {
        const result = service.getScore("23 -2 3- -2 -2 2- -2 2- 2- 2-");

        expect(result).toBe(24);
    });

    it('should add the next throw when a spare is achieved', () => {
        const result = service.getScore("2/ 10 0- -0 -0 0- -0 0- 0- 0-");

        expect(result).toBe(NB_PINS + 2);
    });

    it('should add 10 if next throw of a spare is a strike', () => {
        const result = service.getScore("2/ X0 0- -0 -0 0- -0 0- 0- 0-");

        expect(result).toBe(20 + 10);
    });

    it('should add the 2 next throws if frame is a strike', () => {
        const result = service.getScore("X- 23 0- -0 -0 0- -0 0- 0- 0-");

        expect(result).toBe(15 + 5);
    });

    it('should add the 2 next throws (as spare) if frame is a strike', () => {
        const result = service.getScore("X- 2/ 0- -0 -0 0- -0 0- 0- 0-");

        expect(result).toBe(20 + 10);
    });

});
