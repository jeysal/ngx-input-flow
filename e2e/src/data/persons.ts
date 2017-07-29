export const emptyPerson = { name: '', invited: false };

export const persons = [
  { name: 'p1', invited: true },
  { ...emptyPerson },
  { name: 'p2', invited: false },
];
