import {CheckoutController} from "../checkout.controller";
import {CheckoutRequestDto} from "./checkout-request.dto";
import {CheckoutResponseDto} from "./checkout-response.dto";
import {ICheckoutService} from "../../services/checkout-service.interface";
import {CheckoutServiceResponse} from "../../model/checkoutServiceResponse";
import {CheckoutServiceParams} from "../../model/checkoutServiceParams";

class StubCheckoutService implements ICheckoutService {
    doCheckout(params: CheckoutServiceParams): CheckoutServiceResponse {
        return new CheckoutServiceResponse('abc', 40);
    }
}

describe('CheckoutController', () => {
    let ctrl: CheckoutController;

    beforeEach(() => {
        ctrl = new CheckoutController(new StubCheckoutService());
    })

    it('should throw a BadRequestException if the basketId is not provided', () => {
        const request: CheckoutRequestDto = {
            paymentDetails: {},
            shippingDetails: {}
        } as CheckoutRequestDto;


        expect(() => ctrl.checkout(request)).toThrowError('basketId is required');
    });

    it('should return the order details if the basketId is provided', () => {
        const request: CheckoutRequestDto = {
            basketId: '123',
            paymentDetails: {},
            shippingDetails: {}
        } as CheckoutRequestDto;

        const response: CheckoutResponseDto = ctrl.checkout(request);
        expect(response.orderId).toEqual('abc');

    });
});
