import {CheckoutRequestDto} from "./dtos/checkout-request.dto";
import {CheckoutResponseDto} from "./dtos/checkout-response.dto";
import {BadRequestException} from "./dtos/bad-request-exception";
import {ICheckoutService} from "../services/checkout-service.interface";
import {CheckoutServiceParams} from "../model/checkoutServiceParams";

export class CheckoutController {
    constructor(private checkoutService: ICheckoutService) {
    }


    checkout(request: CheckoutRequestDto): CheckoutResponseDto {
        if (!request.basketId) {
            throw new BadRequestException('basketId is required');
        }
        const response = this.checkoutService.doCheckout(new CheckoutServiceParams(
            request.basketId
        ));
        return {orderId: response.orderId} as CheckoutResponseDto;
    }
}
