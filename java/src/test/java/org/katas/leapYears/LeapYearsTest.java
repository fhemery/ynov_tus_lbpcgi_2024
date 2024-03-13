package org.katas.leapYears;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LeapYearsTest {

    @Test
    public void shouldReturnTrue_WhenYearIsDivisibleBy400 () {
        boolean isLeapYear = LeapYears.IsLeapYear(2000);

        assertTrue(isLeapYear);
    }

    @Test
    public void shouldReturnFalse_WhenYearIsDivisibleBy100ButNot400 () {
        boolean isLeapYear = LeapYears.IsLeapYear(1900);

        assertFalse(isLeapYear);
    }

    @Test
    public void shouldReturnTrue_WhenYearIsDivisibleBy4 () {
        boolean isLeapYear = LeapYears.IsLeapYear(1904);

        assertTrue(isLeapYear);
    }

    @Test
    public void shouldReturnFalse_WhenYearIsNotDivisibleBy4 () {
        boolean isLeapYear = LeapYears.IsLeapYear(1903);

        assertFalse(isLeapYear);
    }
}
