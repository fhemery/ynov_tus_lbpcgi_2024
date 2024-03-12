import {ConversionRateApi, IConversionRateApi} from "./external/conversion-rate-api";
import {CurrencyConverter} from "./currency-converter";
import {Currency} from "./model/currency";
import {Money} from "./model/money";
import {CurrencyIsoCode} from "./external/currency-iso-code";

class GetRateParam {
    constructor(readonly source: CurrencyIsoCode, target: CurrencyIsoCode) {
    }
}

class Rate {
    constructor(readonly source: CurrencyIsoCode, readonly target: CurrencyIsoCode, readonly rate: number) {
    }
}

export class FakeCurrencyApi implements IConversionRateApi {
    readonly calls: GetRateParam[] = [];
    readonly rates : Rate[] = [];

    getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
        this.calls.push(new GetRateParam(source, target));
        const rate = this.rates.find(r => r.source === source && r.target === target);
        if (rate) {
            return rate.rate;
        }
        //throw new Error('No rate found for ' + source + ' to ' + target);
        return 2;
    }
    withRate(source: CurrencyIsoCode, target: CurrencyIsoCode, rate: number): FakeCurrencyApi {
        this.rates.push(new Rate(source, target, rate));
        return this;
    }
}

describe("CurrencyConverter", function () {
    it("is initialized", () => {
        const converter = new CurrencyConverter(new ConversionRateApi());
        expect(converter).toBeTruthy();
    });
    it("does work (with a spy on top on real object)", () => {
        const conversionRateApi = new ConversionRateApi();
        const spy = jest.spyOn(conversionRateApi, "getRate")
            .mockReturnValue(2);
        // conversionRateApi.getRate = jest.fn().mockReturnValue(2);
        // We could do this as well: conversionRateApi.getRate = () => 2;
        const converter = new CurrencyConverter(conversionRateApi);

        const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
        expect(result).toEqual(new Money(4, Currency.Euro));
        expect(spy).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
    });

    it("does work (with a mock object)", () => {
        const conversionRateApi: ConversionRateApi = {
            getRate: jest.fn().mockReturnValue(2)
        };
        const converter = new CurrencyConverter(conversionRateApi);

        const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
        expect(result).toEqual(new Money(4, Currency.Euro));
        expect(conversionRateApi.getRate).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
    });

    it('should work with a fake (with a spy on top)', () => {
        const fakeCurrencyApi = new FakeCurrencyApi();
        const spy = jest.spyOn(fakeCurrencyApi, "getRate");
        const converter = new CurrencyConverter(fakeCurrencyApi);

        // If we want to test for an error
        // expect(() =>converter.sum(Currency.Euro, new Money(2, Currency.Dollar)) ).toThrow();
        const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

        expect(result).toEqual(new Money(4, Currency.Euro));
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should work with a fake (with integrated calls)', () => {
        const fakeCurrencyApi = new FakeCurrencyApi();
        const converter = new CurrencyConverter(fakeCurrencyApi);

        const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

        expect(result).toEqual(new Money(4, Currency.Euro));
        expect(fakeCurrencyApi.calls).toHaveLength(1);
    });

    it('should work with a fake (with integrated calls)', () => {
        const fakeCurrencyApi = new FakeCurrencyApi()
            .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 0.8)
            .withRate(CurrencyIsoCode.JPY, CurrencyIsoCode.EUR, 0.001);

        const converter = new CurrencyConverter(fakeCurrencyApi);


        const result = converter.sum(Currency.Euro,
            new Money(2, Currency.Dollar),
            new Money(1000, Currency.Yen),
            new Money(1, Currency.Dollar),
            new Money(2, Currency.Euro));

        const expectedSum = (2+1) * 0.8 + 1000 * 0.001 + 2;
        expect(result).toEqual(new Money( expectedSum, Currency.Euro));
        expect(fakeCurrencyApi.calls).toHaveLength(2);
    });
});
