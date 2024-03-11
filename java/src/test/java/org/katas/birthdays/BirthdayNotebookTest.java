package org.katas.birthdays;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class BirthdayNotebookTest {
    BirthdayNotebook notebook;

    @BeforeEach
    public void setUp() {
        notebook = new BirthdayNotebook();
    }

    @Test
    public void shouldReturnEmpty_WhenNothingInNotebook() {
        var birthdays = notebook.getBirthdays(new Date());

        Assertions.assertEquals(0, birthdays.size());
    }

    @Test
    public void shouldReturnEmpty_WhenNothingForCurrentDay() {
        Date today = new Date(2024, 4, 2);
        notebook.addBirthday("Alice", today);

        var birthdays = notebook.getBirthdays(new Date(2024, 4, 1));

        Assertions.assertEquals(0, birthdays.size());
    }

    @Test
    public void shouldReturnRecords_WhenThereAreBirthdaysRegistered() {
        var aliceBirthdate = new Date(2016, 2, 1);
        var bobBirthdate = new Date(2017, 2, 1);
        var carolBirthDate = new Date(2017, 2, 2);

        notebook.addBirthday("Alice", aliceBirthdate)
                .addBirthday("Bob", bobBirthdate).addBirthday("Carol", carolBirthDate);

        var birthdays = notebook.getBirthdays(new Date(2024, 2, 1));

        assertEquals(2, birthdays.size());
        assertTrue(birthdays.contains("Alice"));
        assertTrue(birthdays.contains("Bob"));
        assertFalse(birthdays.contains("Carol"));
    }
}