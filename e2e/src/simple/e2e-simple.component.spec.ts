import * as chai from 'chai';
import 'mocha';
import { $, $$, browser, Key } from 'protractor';
import { emptyPerson, persons } from './persons';

chai.should();

testComponent('/simple', 'tr');
testComponent('/multi-model', 'tr');
testComponent('/multi-for', 'td');

function testComponent(route: string, repeaterType: string) {
  describe('The directives used for a simple table on ' + route, () => {
    beforeEach(async () => await browser.get(route));

    it('render given array with an additional flow item', async () => {
      (await displayedPersons()).should.eql([...persons, emptyPerson]);
    });

    it('add another flow item when typing in the current one', async () => {
      await $(`${repeaterType}:last-child input[name="name"]`).sendKeys('x');

      (await displayedPersons()).should.eql([
        ...persons,
        { name: 'x', invited: false },
        emptyPerson,
      ]);
    });

    it('add another flow item when checking the current one', async () => {
      await $(`${repeaterType}:last-child input[name="invited"]`).click();

      (await displayedPersons()).should.eql([
        ...persons,
        { name: '', invited: true },
        emptyPerson,
      ]);
    });

    it('remove the flow item when the previous one becomes empty', async () => {
      await $(`${repeaterType}:nth-child(3) input[name="name"]`).sendKeys(
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

    it('remove an intermediate empty item when losing focus', async () => {
      await $(`${repeaterType}:nth-child(2) input[name="invited"]`).sendKeys(
        Key.TAB,
      );

      (await displayedPersons()).should.eql([
        persons[0],
        persons[2],
        emptyPerson,
      ]);
    });

    it('remove the first item when empty and losing focus', async () => {
      await $(`${repeaterType}:first-child input[name="name"]`).sendKeys(
        Key.CONTROL,
        'a',
        Key.NULL,
        Key.DELETE,
      );
      await $(`${repeaterType}:first-child input[name="invited"]`).click();
      await $(`${repeaterType}:nth-child(2) input[name="name"]`).click();

      (await displayedPersons()).should.eql([...persons.slice(1), emptyPerson]);
    });

    it('do not remove an intermediate item before losing focus', async () => {
      await $(`${repeaterType}:first-child input[name="name"]`).sendKeys(
        Key.CONTROL,
        'a',
        Key.NULL,
        Key.DELETE,
      );
      await $(`${repeaterType}:first-child input[name="invited"]`).click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        ...persons.slice(1),
        emptyPerson,
      ]);
    });

    it('do not remove an item that is only partially empty', async () => {
      await $(`${repeaterType}:first-child input[name="name"]`).sendKeys(
        Key.CONTROL,
        'a',
        Key.NULL,
        Key.DELETE,
      );
      await $(`${repeaterType}:nth-child(2) input[name="name"]`).click();

      (await displayedPersons()).should.eql([
        { name: '', invited: true },
        ...persons.slice(1),
        emptyPerson,
      ]);
    });
  });
}

async function displayedPersons() {
  const names = await $$('input[name="name"]').map((input: any) =>
    input.getAttribute('value'),
  );
  const invites = await $$('input[name="invited"]').map((input: any) =>
    input.isSelected(),
  );
  return names.map((name, i) => ({ name, invited: !!invites[i] }));
}
