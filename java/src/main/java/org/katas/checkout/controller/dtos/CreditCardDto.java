package org.katas.checkout.controller.dtos;

public record CreditCardDto(String number, String expirationDate, String ccv) {
}
