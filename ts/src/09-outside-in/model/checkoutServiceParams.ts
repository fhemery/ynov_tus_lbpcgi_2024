export class CheckoutServiceParams {
    constructor(readonly basketId: string) {
        if(!basketId){
            throw new Error('basketId is required');
        }
    }
}
