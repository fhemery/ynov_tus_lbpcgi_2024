package org.katas.currency;

import org.katas.currency.external.IConversionRateApi;
import org.katas.currency.model.Currency;
import org.katas.currency.model.Money;

import java.util.HashMap;

public class CurrencyConverter {
    private final IConversionRateApi rateApi;

    CurrencyConverter(IConversionRateApi rateApi) {
        this.rateApi = rateApi;
    }

    Money sum(Currency target, Money... moneys) {
        // We are paying each call we make to the API, so better not make useless calls
        double amount = 0.0;

        var knownRates = new HashMap<Currency, Double>();
        knownRates.put(target, 1.0);

        for (var m: moneys) {
            if (!knownRates.containsKey(m.currency())){
                knownRates.put(m.currency(), this.rateApi.getRate(m.currency().toIsoCode(), target.toIsoCode()));
            }
            amount += m.amount() * knownRates.get(m.currency());
        }

        return new Money(amount, target);
    }
}
