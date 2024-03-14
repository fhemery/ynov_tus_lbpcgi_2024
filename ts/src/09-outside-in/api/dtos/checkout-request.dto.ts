interface PaymentDetailsDto {
}

interface ShippingDetailsDto {
}

export interface CheckoutRequestDto {
    basketId: string;
    paymentDetails: PaymentDetailsDto;
    shippingDetails: ShippingDetailsDto;
}
