package org.katas.checkout.controller.dtos;

public record CheckoutRequestDto(String cartId, CreditCardDto creditCardDto, DeliveryDto deliveryDto) {
}
