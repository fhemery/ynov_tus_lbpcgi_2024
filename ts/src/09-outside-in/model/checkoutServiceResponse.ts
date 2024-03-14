export class CheckoutServiceResponse {
    constructor(readonly orderId: string, readonly total: number) {
    }
}
