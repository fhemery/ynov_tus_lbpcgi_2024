import {Teller} from "../src/model/Teller";
import {FakeCatalog} from "./FakeCatalog";
import {ShoppingCart} from "../src/model/ShoppingCart";

describe('Teller', () => {
    let teller: Teller;
    let catalog: FakeCatalog;

    beforeEach(()=> {
        catalog = new FakeCatalog();
        teller = new Teller(catalog);
    });

    it('should return an empty receipt for an empty basket', () => {
        const shoppingCart = new ShoppingCart();
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        expect(receipt.getTotalPrice()).toBe(0);
        expect(receipt.getDiscounts()).toHaveLength(0);
        expect(receipt.getItems()).toHaveLength(0);
    });
});
