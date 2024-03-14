package org.katas.checkout.services.model;

public record CheckoutRequest(String cartId, String deliveryName, String deliveryStreet, String deliveryCity, String creditCardNumber, String creditCardExpiry, String creditCardCvv) {
}
