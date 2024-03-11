package org.katas.birthdays;

import java.util.*;
import java.util.stream.Collectors;

public class BirthdayNotebook {
  private final Map<String, List<Birthday>> birthdays = new HashMap<>();

  public BirthdayNotebook addBirthday(String name, Date date) {
    String dateAsStr = date.getMonth() + "/" + date.getDate();
    List<Birthday> birthdaysOnDate = birthdays.get(dateAsStr);
    if (birthdaysOnDate == null) {
      birthdaysOnDate = new ArrayList<>();
      birthdays.put(dateAsStr, birthdaysOnDate);
    }
    birthdaysOnDate.add(new Birthday(date, name));
    return this;
  }

  public List<String> getBirthdays(Date date) {
    String dateAsStr = date.getMonth() + "/" + date.getDate();
    List<Birthday> birthdaysOnDate = birthdays.get(dateAsStr);
    if (birthdaysOnDate == null) {
      return Collections.emptyList();
    }
    return birthdaysOnDate.stream().map(b -> b.name).collect(Collectors.toList());
  }
}