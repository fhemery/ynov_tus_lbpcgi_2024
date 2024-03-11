package org.katas.evenChecker;

public class EvenChecker {
    private int count = 0;

    public void add(int howMany) {
        count += howMany;
    }

    public boolean isEven() {
        /* I am pretty sure there is a better way... */
        int tmp = count;
        Parity result = Parity.Even;
        while (tmp > 0) {
            --tmp;
            if (result == Parity.Even) {
                result = Parity.Odd;
            } else {
                result = Parity.Even;
            }
        }

        return result == Parity.Even;
    }

    enum Parity { Even, Odd }
}
