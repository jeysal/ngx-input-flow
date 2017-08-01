import * as chai from 'chai';
import 'mocha';
import { $, $$, browser } from 'protractor';

chai.should();

describe('The directives used with input type', () => {
  beforeEach(async () => await browser.get('/other-inputs'));

  describe('select', () => {
    it('allow entering multiple items in a row', async () => {
      await (await $$('select'))[0].click();
      await (await $$('option.a'))[0].click();
      await (await $$('select'))[1].click();
      await (await $$('option.b'))[1].click();

      JSON.parse(await $('#items').getText()).should.eql([
        { x: 'a' },
        { x: 'b' },
      ]);
    });

    it('allow removing intermediate items', async () => {
      await (await $$('select'))[0].click();
      await (await $$('option.a'))[0].click();
      await (await $$('select'))[1].click();
      await (await $$('option.b'))[1].click();
      await (await $$('select'))[0].click();
      await (await $$('option.n'))[0].click();

      // safe focusout for all browsers, just clicking #items not sufficient on Edge
      await (await $$('input.n'))[0].click();
      await (await $('#items')).click();

      JSON.parse(await $('#items').getText()).should.eql([{ x: 'b' }]);
    });
  });

  describe('radio', () => {
    it('allow entering multiple items in a row', async () => {
      await (await $$('input.a'))[0].click();
      await (await $$('input.b'))[1].click();

      JSON.parse(await $('#items').getText()).should.eql([
        { y: 'a' },
        { y: 'b' },
      ]);
    });

    it('allow removing intermediate items', async () => {
      await (await $$('input.a'))[0].click();
      await (await $$('input.b'))[1].click();
      await (await $$('input.n'))[0].click();
      await (await $('#items')).click();

      JSON.parse(await $('#items').getText()).should.eql([{ y: 'b' }]);
    });
  });
});
