import {CheckoutServiceParams} from "../model/checkoutServiceParams";
import {CheckoutServiceResponse} from "../model/checkoutServiceResponse";
import {ICheckoutService} from "./checkout-service.interface";
import {BasketNotFoundException} from "../model/exceptions/basketNotFoundException";
import {BasketEmptyException} from "../model/exceptions/basket-empty.exception";

class CheckoutService implements ICheckoutService {
    constructor(private basketService: BasketService) {

    }

    doCheckout(params: CheckoutServiceParams): CheckoutServiceResponse {
        const basket = this.basketService.getBasket(params.basketId);
        if (!basket) {
            throw new BasketNotFoundException();
        } else if (basket.isEmpty()) {
            throw new BasketEmptyException();
        }
        return new CheckoutServiceResponse('', basket.total);
    }
}

class Basket {
    constructor(readonly nbArticles: number, readonly total = 0) {
    }

    isEmpty() {
        return this.nbArticles === 0;
    }
}

class BasketService {
    getBasket(basketId: string): Basket | null {
        return null;
    }
}

describe('Checkout service', () => {

    let checkoutService: CheckoutService;
    let basketService: BasketService;
    beforeEach(() => {
        basketService = new BasketService();
        jest.spyOn(basketService, 'getBasket').mockReturnValue(null);
        checkoutService = new CheckoutService(basketService);
    });

    it('should throw an error if the basketId is not provided', () => {
        expect(() => new CheckoutServiceParams('')).toThrowError('basketId is required');
    });

    it('should throw an error if the basketId is not found', () => {
        const params = new CheckoutServiceParams('123');

        expect(() => checkoutService.doCheckout(params)).toThrowError(new BasketNotFoundException());
    });

    it('should throw an error if the basket is empty', () => {
        const params = new CheckoutServiceParams('123');
        jest.spyOn(basketService, 'getBasket').mockReturnValue(new Basket(0, 0));
        expect(() => checkoutService.doCheckout(params)).toThrowError(new BasketEmptyException());
    });

    it('should return the order details if the basketId is provided', () => {
        const params = new CheckoutServiceParams('123');
        jest.spyOn(basketService, 'getBasket').mockReturnValue(new Basket(1, 40));
        const response = checkoutService.doCheckout(params);
        expect(response.total).toEqual(40);
    });
});
