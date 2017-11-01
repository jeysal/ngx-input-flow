import * as chai from 'chai';
import 'mocha';
import { $$, browser } from 'protractor';
import { displayedPersons } from '../data/displayed-persons';
import { emptyPerson } from '../data/persons';

chai.should();

describe('A complete replacement of the array', () => {
  beforeEach(async () => browser.get('/replacement'));

  it('results in the new array being displayed', async () => {
    (await $$('input[name="name"]'))[0].click();

    (await displayedPersons()).should.eql([
      { name: 'new1', invited: true },
      { name: 'p1', invited: true },
      { name: 'new2', invited: false },
      emptyPerson,
    ]);
  });

  it('preserves focus on the first element', async () => {
    (await $$('input[name="name"]'))[0].click();

    (await browser
      .switchTo()
      .activeElement()
      .getAttribute('value')).should.eql('p1');
  });
});
