package org.katas.currency;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.katas.currency.external.ConversionRateApi;
import org.junit.jupiter.api.Test;
import org.katas.currency.external.CurrencyIsoCode;
import org.katas.currency.fake.ConversionRateApiFake;
import org.katas.currency.model.Currency;
import org.katas.currency.model.Money;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import static org.junit.jupiter.api.Assertions.assertEquals;



@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.STRICT_STUBS )
class CurrencyConverterTest {
    @Mock
    private ConversionRateApi rateApi;

    @Test
    void shouldWork() {
        assertEquals(3, 1+2);
    }

    @Test
    void sum_performConversionFromDollarToEuros() {
        Mockito.when(rateApi.getRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR)).thenReturn(0.8);
        var converter = new CurrencyConverter(rateApi);

        var result = converter.sum(Currency.Euro, new Money(1, Currency.Dollar));
        Assertions.assertEquals(0.8, result.amount());
        Assertions.assertEquals(Currency.Euro, result.currency());
    }

    @Test
    void sum_shouldNotCallApiTwice_WhenSameCurrency() {
        Mockito.when(rateApi.getRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR)).thenReturn(0.8);
        var converter = new CurrencyConverter(rateApi);

        var result = converter.sum(Currency.Euro, new Money(1, Currency.Dollar), new Money(1, Currency.Dollar));
        Assertions.assertEquals(1.6, result.amount());
        Assertions.assertEquals(Currency.Euro, result.currency());

        // THIS IS A WHITE BOX TEST
        // BUT IT IS CRUCIAL ECONOMICALLY SPEAKING
        Mockito.verify(rateApi, Mockito.times(1)).getRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
    }

    @Test
    void sum_performConversionFromDollarToEuros_withFake() {
        var rateApi = new ConversionRateApiFake()
                .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 0.8);
        var converter = new CurrencyConverter(rateApi);

        var result = converter.sum(Currency.Euro, new Money(1, Currency.Dollar));
        Assertions.assertEquals(0.8, result.amount());
        Assertions.assertEquals(Currency.Euro, result.currency());
    }
}