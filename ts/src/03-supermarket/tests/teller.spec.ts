import {Teller} from "../src/model/Teller";
import {FakeCatalog} from "./FakeCatalog";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";
import {SpecialOfferType} from "../src/model/SpecialOfferType";

describe('Teller', () => {
    let teller: Teller;
    let catalog: FakeCatalog;
    let shoppingCart: ShoppingCart;

    beforeEach(()=> {
        catalog = new FakeCatalog();
        teller = new Teller(catalog);
        shoppingCart = new ShoppingCart();
    });

    it('should return an empty receipt for an empty basket', () => {
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        expect(receipt.getTotalPrice()).toBe(0);
        expect(receipt.getDiscounts()).toHaveLength(0);
        expect(receipt.getItems()).toHaveLength(0);
    });

    it('should return price for one unit of one product', () => {
        const product = new Product('Apples', ProductUnit.Kilo);
        catalog.addProduct(product, 2.50);

        shoppingCart.addItemQuantity(product, 1);

        const receipt = teller.checksOutArticlesFrom(shoppingCart);
        expect(receipt.getTotalPrice()).toBe(2.50);
    });

    it('should work with discounts', () => {
        const apples = new Product('Apples', ProductUnit.Kilo);
        catalog.addProduct(apples, 2.50);

        shoppingCart.addItemQuantity(apples, 1);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10);

        const receipt = teller.checksOutArticlesFrom(shoppingCart);
        expect(receipt.getTotalPrice()).toBe(2.25);
    });
});
