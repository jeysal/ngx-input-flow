import * as chai from 'chai';
import 'mocha';
import { $, browser, Key } from 'protractor';
import { displayedPersons } from '../data/displayed-persons';
import { emptyPerson, persons } from '../data/persons';

chai.should();

describe('The directives used without a ngxInputFlowModel binding', () => {
  beforeEach(async () => browser.get('/no-model-binding'));

  it('render given array with an additional flow item', async () => {
    (await displayedPersons()).should.eql([...persons, emptyPerson]);
  });

  it('add another flow item when typing in the current one', async () => {
    await $(`tr:last-child input[name="name"]`).sendKeys('x');

    (await displayedPersons()).should.eql([
      ...persons,
      { name: 'x', invited: false },
      emptyPerson,
    ]);
  });

  it('add another flow item when checking the current one', async () => {
    await $(`tr:last-child input[name="invited"]`).click();

    (await displayedPersons()).should.eql([
      ...persons,
      { name: '', invited: true },
      emptyPerson,
    ]);
  });

  it('remove the flow item when the previous one becomes empty', async () => {
    await $(`tr:nth-child(3) input[name="name"]`).sendKeys(
      Key.CONTROL,
      'a',
      Key.NULL,
      Key.DELETE,
    );

    (await displayedPersons()).should.eql([
      ...persons.slice(0, 2),
      emptyPerson,
    ]);
  });

  it('do not remove an intermediate empty item when losing focus', async () => {
    await $(`tr:nth-child(2) input[name="invited"]`).sendKeys(Key.TAB);

    (await displayedPersons()).should.eql([...persons, emptyPerson]);
  });
});
