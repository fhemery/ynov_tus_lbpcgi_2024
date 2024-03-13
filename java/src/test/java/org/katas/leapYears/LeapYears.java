package org.katas.leapYears;

public class LeapYears {
    public static boolean IsLeapYear(int year) {
        if (isDivisibleBy(year, 100)) {
            return isDivisibleBy(year, 400);
        }
        return isDivisibleBy(year, 4);

        // Works, but less readable :
        // return year % 400 == 0 || (year %100 != 0 && year % 4 == 0);
    }

    private static boolean isDivisibleBy(int year, int radix) {
        return year % radix == 0;
    }
}
