import * as chai from 'chai';
import 'mocha';
import { $, $$, browser, Key } from 'protractor';

chai.should();

describe('Nested ngxInputFlow', () => {
  beforeEach(async () => await browser.get('/nested'));

  it('renders an initial empty item for both the inner and the outer array', async () => {
    (await $$('.name').count()).should.equal(1);
    (await $$('.email').count()).should.equal(1);
  });

  it('adds another inner and outer item when typing in the first one', async () => {
    await $('.email > input').sendKeys('asdf');

    (await $$('.person').count()).should.equal(2);
    (await $$('.name').count()).should.equal(2);
    (await $$('.email').count()).should.equal(2);
  });

  it('removes an inner item that becomes empty', async () => {
    await $('.person:first-child > .email > input:last-child').sendKeys('asdf');
    await $('.person:first-child > .email > input:last-child').sendKeys('asdf');
    await $('.person:first-child > .email > input:last-child').sendKeys('asdf');
    await $('.person:first-child > .email > input:first-child').sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );
    await $('.person:first-child > .email > input:last-child').click();

    (await $$('.person:first-child > .email > input').count()).should.equal(3);
  });

  it('removes an outer item that becomes empty', async () => {
    await $('.person:last-child > .name > input').sendKeys('asdf');
    await $('.person:last-child > .name > input').sendKeys('asdf');
    await $('.person:last-child > .name > input').sendKeys('asdf');
    await $('.person:first-child > .name > input').sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );
    await $('.person:last-child > .name > input').click();

    (await $$('.person').count()).should.equal(3);
  });
});
