import {CheckoutServiceParams} from "../model/checkoutServiceParams";
import {CheckoutServiceResponse} from "../model/checkoutServiceResponse";

export interface ICheckoutService {
    doCheckout(params: CheckoutServiceParams): CheckoutServiceResponse;
}
