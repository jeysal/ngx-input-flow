import * as chai from 'chai';
import 'mocha';
import { $, browser } from 'protractor';
import { displayedPersons } from '../data/displayed-persons';
import { emptyPerson, persons } from '../data/persons';

chai.should();

describe('The checkElements setting', () => {
  describe('"None"', () => {
    beforeEach(async () => await browser.get('/check-no-elements'));

    it('should render the empty item included in the array', async () => {
      (await displayedPersons()).should.eql([...persons, emptyPerson]);
    });

    it('should still render an item that has been emptied', async () => {
      await $('#empty-first').click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        ...persons.slice(1),
        emptyPerson,
      ]);
    });

    it('should still render an item that has been replaced with an empty item', async () => {
      await $('#replace-first-empty').click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        ...persons.slice(1),
        emptyPerson,
      ]);
    });

    it('should render an empty item that has been prepended', async () => {
      await $('#prepend-empty').click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        ...persons,
        emptyPerson,
      ]);
    });
  });

  describe('"New"', () => {
    beforeEach(async () => await browser.get('/check-new-elements'));

    it('should not render the empty item included in the array', async () => {
      (await displayedPersons()).should.eql([
        persons[0],
        persons[2],
        emptyPerson,
      ]);
    });

    it('should still render an item that has been emptied', async () => {
      await $('#empty-first').click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        persons[2],
        emptyPerson,
      ]);
    });

    it('should no longer render an item that has been replaced with an empty item', async () => {
      await $('#replace-first-empty').click();

      (await displayedPersons()).should.eql([persons[2], emptyPerson]);
    });

    it('should still render an item that has been replaced with an empty item, but has the same tracking identity', async () => {
      await $('#replace-first-empty-retaining-id').click();

      (await displayedPersons()).should.eql([
        emptyPerson,
        persons[2],
        emptyPerson,
      ]);
    });

    it('should not render an empty item that has been prepended', async () => {
      await $('#prepend-empty').click();

      (await displayedPersons()).should.eql([
        persons[0],
        persons[2],
        emptyPerson,
      ]);
    });
  });

  describe('"All"', () => {
    beforeEach(async () => await browser.get('/check-all-elements'));

    it('should not render the empty item included in the array', async () => {
      (await displayedPersons()).should.eql([
        persons[0],
        persons[2],
        emptyPerson,
      ]);
    });

    it('should no longer render an item that has been emptied', async () => {
      await $('#empty-first').click();

      (await displayedPersons()).should.eql([persons[2], emptyPerson]);
    });

    it('should no longer render an item that has been replaced with an empty item', async () => {
      await $('#replace-first-empty').click();

      (await displayedPersons()).should.eql([persons[2], emptyPerson]);
    });

    it('should not render an empty item that has been prepended', async () => {
      await $('#prepend-empty').click();

      (await displayedPersons()).should.eql([
        persons[0],
        persons[2],
        emptyPerson,
      ]);
    });
  });
});
