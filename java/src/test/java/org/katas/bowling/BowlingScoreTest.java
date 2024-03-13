package org.katas.bowling;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BowlingScoreTest {

    @Test
    public void shouldReturn0_IfAllThrowsAreAMiss() {
        var bowlingScore = new BowlingScore("-- -- -- -- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals(0, score);
    }

    @Test
    public void shouldReturn300_IfAllThrowsAreStrike() {
        var bowlingScore = new BowlingScore("X X X X X X X X X X X X");
        int score = bowlingScore.getScore();

        assertEquals(300, score);
    }

    @Test
    public void shouldReturnThrowAddition_WhenNoStrikeNoSpare() {
        var bowlingScore = new BowlingScore("-2 3- -- -- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals(5, score);
    }

    @Test
    public void shouldAddTheNextTwoThrows_WhenStrikeInFrame() {
        var bowlingScore = new BowlingScore("-- X 23 -- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals(15 + 5, score);

    }

    @Test
    public void shouldAddTheNextTwoThrows_WhenStrikeInFrame_AndStrikesAreSuccessive() {
        var bowlingScore = new BowlingScore("-- X X 23 -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals( 22 + 15 + 5, score);
    }

    @Test
    public void shouldAddTheNextTwoThrows_WhenStrikeInFrame_AndThreeStrikesInARow() {
        var bowlingScore = new BowlingScore("-- X X X 23 -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals( 30 + 22 + 15 + 5, score);
    }

    @Test
    public void shouldAddTheNextThrow_WhenSpareInFrame() {
        var bowlingScore = new BowlingScore("-- 2/ 23 -- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals( 12 + 5, score);
    }
    @Test
    public void shouldAddTheNextThrow_WhenSpareInFrameAndNextFrameIsStrike() {
        var bowlingScore = new BowlingScore("-- 2/ X -- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals( 20 + 10, score);
    }

    @Test
    public void should_ComputeCorrectly_whenAllSpares() {
        var bowlingScore = new BowlingScore("-/ -/ -/ -/ -/ -/ -/ -/ -/ -/ 2-");
        int score = bowlingScore.getScore();

        assertEquals( 9*10 + 12, score);
    }

    @Test
    public void should_add10_whenSpareAfterStrike() {
        var bowlingScore = new BowlingScore("-- X 2/ 2- -- -- -- -- -- --");
        int score = bowlingScore.getScore();

        assertEquals( 20 + 12 + 2, score);
    }
}
