package org.katas.checkout.controller;

import org.katas.checkout.controller.dtos.CheckoutResponseDto;
import org.katas.checkout.controller.dtos.CheckoutRequestDto;
import org.katas.checkout.controller.exceptions.BadRequestException;
import org.katas.checkout.services.CheckoutService;
import org.katas.checkout.services.model.CheckoutRequest;

public class CheckoutController {

    private final CheckoutService checkoutService;

    CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    public CheckoutResponseDto checkout(CheckoutRequestDto requestDto) {
        if (requestDto == null || requestDto.cartId() == null)
            throw new BadRequestException();

        var response = checkoutService.checkout(mapToCheckoutRequest(requestDto));
        return new CheckoutResponseDto(response.orderId(), null, -1);
    }

    private CheckoutRequest mapToCheckoutRequest(CheckoutRequestDto requestDto) {
        return new CheckoutRequest(requestDto.cartId(), requestDto.deliveryDto().name(), requestDto.deliveryDto().street(), requestDto.deliveryDto().city(), requestDto.creditCardDto().number(), requestDto.creditCardDto().expirationDate(), requestDto.creditCardDto().ccv());
    }
}
