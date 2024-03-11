import {Score, TennisScore} from "./tennis-score";

function doIt(): Promise<boolean> {
    return Promise.resolve(false);
}

describe('Tennis Score', () => {
    it('should work', async () => {
        expect(await doIt()).toBe(false);
    });

    let tennisScore: TennisScore
    beforeEach(() => {
        tennisScore = new TennisScore();
    })


    it('should return 0 - 0 by default', () => {
        expect(tennisScore.getScore()).toBe('0 - 0');
    });

    it('should return 15 - 0 if player 1 score', () => {
        tennisScore.player1Scores();
        expect(tennisScore.getScore()).toBe('15 - 0');
    });

    it('should return 30 - 30 if it is close', () => {
        tennisScore.player1Scores().player2Scores().player2Scores().player1Scores();

        expect(tennisScore.getScore()).toBe('30 - 30')
    })
});
