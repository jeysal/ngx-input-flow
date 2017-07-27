import * as chai from 'chai';
import 'mocha';
import { $, $$, browser, Key } from 'protractor';

chai.should();

describe('The directives used for a form with text inputs', () => {
  beforeEach(async () => await browser.get('/form'));
  it('should render one initial empty input', async () => {
    const inputValues = await $$('input').map((input: any) =>
      input.getAttribute('value'),
    );

    inputValues.should.eql(['']);
  });

  it('should allow entering multiple items in a row', async () => {
    await $('input').sendKeys(
      ...Array(8).fill(null).map((_, i) => (i % 2 ? Key.TAB : i / 2)),
    );

    JSON.parse(await $('#customers').getText()).should.eql(
      Array(4).fill(0).map((_, i) => ({ id: '' + i })),
    );
  });

  it('should allow removing intermediate items', async () => {
    await $('input').sendKeys(
      ...Array(8).fill(null).map((_, i) => (i % 2 ? Key.TAB : i / 2)),
    );
    await $('input:nth-child(3)').sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );
    await $('input:first-child').sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );
    await $('input:last-child').click();

    JSON.parse(await $('#customers').getText()).should.eql(
      ['1', '3'].map(val => ({ id: val })),
    );
  });
});
