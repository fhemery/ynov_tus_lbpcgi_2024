import { Item, GildedRose } from './gilded-rose';

describe('Gilded Rose', () => {
  describe('for normal items', () => {

    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'foo', sellIn: -1, quality: 0 });
    });

    it('should decrease quality by 1 when sellIn is positive', () => {
      const gildedRose = new GildedRose([new Item('foo', 60, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'foo', sellIn: 59, quality: 9 });
    });

    it('should decrease quality by 2 when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'foo', sellIn: -1, quality: 8 });
    });
  });

  describe('Aged Brie', () => {
    it('should increase quality by 1 when sellIn is positive', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 60, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Aged Brie', sellIn: 59, quality: 11 });
    });

    it('should increase quality by 2 when sellIn is negative', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Aged Brie', sellIn: -1, quality: 12 });
    });
  });

  describe('Backstage pass', () => {
    it('should increase quality by 1 when sellIn is positive', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 60, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 59, quality: 11 });
    });

    it('should increase quality by 2 when sellIn 10 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 9, quality: 12 });
    });

    it('should increase quality by 3 when sellIn 5 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 13 });
    });

    it('should drop quality to 0 when product is expired', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: -1, quality: 0 });
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('should never change quality or sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 60, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toEqual({ name: 'Sulfuras, Hand of Ragnaros', sellIn: 60, quality: 10 });
    });
  });
});
