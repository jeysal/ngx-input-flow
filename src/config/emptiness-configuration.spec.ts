import 'chai';
import 'mocha';
import { EmptinessConfiguration } from './emptiness-configuration';

describe('The default EmptinessConfiguration', () => {
  let config: EmptinessConfiguration;

  beforeEach(() => {
    config = new EmptinessConfiguration();
  });

  it('considers an object without properties empty', () => {
    config.isEmpty({}).should.be.true;
  });

  it('considers an object with falsy properties empty', () => {
    config.isEmpty({
      a: '',
      b: 0,
      c: false,
    }).should.be.true;
  });

  it('does not consider an object with truthy properties empty', () => {
    config.isEmpty({
      a: 'a',
      b: 1,
      c: true,
    }).should.be.false;
  });

  it('does not consider an object with falsy and truthy properties empty', () => {
    config.isEmpty({
      a: '',
      b: 1,
      c: false,
    }).should.be.false;
  });

  it('does not consider an object with falsy properties in a nested object empty', () => {
    config.isEmpty({
      a: '',
      b: 0,
      nested: {
        c: false,
      },
    }).should.be.false;
  });

  it('does not consider an object with falsy properties in a nested array empty', () => {
    config.isEmpty({
      a: '',
      b: 0,
      nested: [false],
    }).should.be.false;
  });

  it('creates blank objects as items', () => {
    config.createEmptyItem().should.eql({});
  });

  it('creates a referentially new item every time', () => {
    config.createEmptyItem().should.not.equal(config.createEmptyItem());
  });
});
