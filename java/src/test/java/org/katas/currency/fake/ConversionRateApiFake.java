package org.katas.currency.fake;

import org.katas.currency.external.ConversionRateApi;
import org.katas.currency.external.CurrencyIsoCode;
import org.katas.currency.external.IConversionRateApi;

import java.util.HashMap;

public class ConversionRateApiFake implements IConversionRateApi {
    private HashMap<CurrencyIsoCode, HashMap<CurrencyIsoCode, Double>> rates = new HashMap<>();

    @Override
    public double getRate(CurrencyIsoCode source, CurrencyIsoCode target) {
        if (rates.containsKey(source) && rates.get(source).containsKey(target)) {
            return rates.get(source).get(target);
        }
        return 2;
    }

    public ConversionRateApiFake withRate(CurrencyIsoCode source, CurrencyIsoCode target, double rate)  {
        if (!rates.containsKey(source)) {
            rates.put(source, new HashMap<>());
        }
        rates.get(source).put(target, rate);
        return this;
    }
}
