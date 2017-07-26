import * as chai from 'chai';
import 'mocha';
import { $$, browser, Key } from 'protractor';

chai.should();

describe('The custom emptiness config', () => {
  beforeEach(async () => await browser.get('/custom-empty'));

  it('is used to generate a fresh item every time', async () => {
    await (await $$('input[name="product"]'))[1].sendKeys('456');

    (await displayedItems()).should.eql([
      { product: '123', count: '1' },
      { product: '456', count: '1' },
      { product: '', count: '1' },
    ]);
  });

  it('is used to determine when to append a flow item', async () => {
    await (await $$('input[name="product"]'))[0].sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );

    (await displayedItems()).should.eql([{ product: '', count: '1' }]);
  });
});

async function displayedItems() {
  const products = await $$('input[name="product"]').map((input: any) =>
    input.getAttribute('value'),
  );
  const counts = await $$('input[name="count"]').map((input: any) =>
    input.getAttribute('value'),
  );
  return products.map((product, i) => ({ product, count: counts[i] }));
}
