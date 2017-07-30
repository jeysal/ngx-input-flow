import { emptyPerson, persons } from '../data/persons';

export abstract class E2eCheckElementsComponentBase {
  persons = persons;

  emptyFirst() {
    this.persons[0].name = emptyPerson.name;
    this.persons[0].invited = emptyPerson.invited;
  }

  replaceFirstEmpty() {
    this.persons[0] = { ...emptyPerson };
  }

  prependEmpty() {
    this.persons.unshift({ ...emptyPerson });
  }
}
