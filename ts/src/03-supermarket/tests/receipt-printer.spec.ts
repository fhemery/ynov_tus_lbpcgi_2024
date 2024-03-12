import {ReceiptPrinter} from "../src/ReceiptPrinter";
import {Receipt} from "../src/model/Receipt";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";

describe('Receipt Printer', () => {
    let receiptPrinter: ReceiptPrinter;

    beforeEach(() => {
        receiptPrinter = new ReceiptPrinter();
    });

    it('should return empty ticket with a receipt with no product', () => {
        const receipt = new Receipt();

        const printedReceipt = receiptPrinter.printReceipt(receipt);

        expect(printedReceipt).toMatchSnapshot();
    });

    it('should return a line with an added product', () => {
        const receipt = new Receipt();
        receipt.addProduct(new Product('Apples', ProductUnit.Kilo), 3, 2.50, 7.50);

        const printedReceipt = receiptPrinter.printReceipt(receipt);
        expect(printedReceipt).toMatchSnapshot();
    });
});
