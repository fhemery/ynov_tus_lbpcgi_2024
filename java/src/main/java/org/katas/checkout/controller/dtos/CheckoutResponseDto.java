package org.katas.checkout.controller.dtos;

public record CheckoutResponseDto(String orderId, String paymentId, double amount){}
