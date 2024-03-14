package org.katas.checkout.services.model;

public record CheckoutResponse(String orderId, String orderNumber, int totalAmount) {
}
