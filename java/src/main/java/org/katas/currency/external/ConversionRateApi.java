package org.katas.currency.external;

public class ConversionRateApi implements IConversionRateApi {
    @Override
    public double getRate(CurrencyIsoCode source, CurrencyIsoCode target) {
        System.out.println("Getting rate from " + source + " to " + target);
        throw new RuntimeException("401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?");
    }
}
