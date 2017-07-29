import { $$ } from 'protractor';

export async function displayedPersons() {
  const names = await $$('input[name="name"]').map((input: any) =>
    input.getAttribute('value'),
  );
  const invites = await $$('input[name="invited"]').map((input: any) =>
    input.isSelected(),
  );
  return names.map((name, i) => ({ name, invited: !!invites[i] }));
}
