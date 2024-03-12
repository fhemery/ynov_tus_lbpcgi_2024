package org.katas.currency.model;

import org.katas.currency.external.CurrencyIsoCode;

public enum Currency {
    Euro("€"),
    Dollar("$"),
    Pound("£"),
    Yen("¥");

    Currency(String symbol) {}

    public CurrencyIsoCode toIsoCode() {
        return switch (this) {
            case Euro -> CurrencyIsoCode.EUR;
            case Dollar -> CurrencyIsoCode.USD;
            case Pound -> CurrencyIsoCode.GBP;
            case Yen -> CurrencyIsoCode.JPY;
        };
    }
}
