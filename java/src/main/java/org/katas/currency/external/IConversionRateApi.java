package org.katas.currency.external;

public interface IConversionRateApi {
    double getRate(CurrencyIsoCode source, CurrencyIsoCode target);
}
