package org.katas.evenChecker;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EvenCheckerTest {
    EvenChecker checker;

    @BeforeEach
    public void setUp() {
        checker = new EvenChecker();
    }

    @Test
    public void should_ReturnFalse_IfNumberIsOdd() {
        checker.add(3);
        Assertions.assertFalse(checker.isEven());
    }

    @Test
    public void should_ReturnTrue_IfNumberIsEven() {
        checker.add(2);
        Assertions.assertTrue(checker.isEven());
    }
}