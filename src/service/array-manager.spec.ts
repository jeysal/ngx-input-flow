import 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { EmptinessConfiguration } from '../config/emptiness-configuration';
import { ArrayManager } from './array-manager';

describe('ArrayManager', () => {
  let isEmpty: sinon.SinonStub;
  let createEmptyItem: sinon.SinonStub;
  let config: EmptinessConfiguration;
  let manager: ArrayManager<any>;

  beforeEach(() => {
    isEmpty = sinon.stub();
    createEmptyItem = sinon.stub();
    config = { isEmpty, createEmptyItem };
  });

  describe('#getFlow()', () => {
    beforeEach(() => {
      createEmptyItem.onFirstCall().returns({});
      createEmptyItem.onSecondCall().returns({});

      manager = new ArrayManager(config);
    });

    it('returns the current array with the flow item appended', () => {
      manager.current = ['first', 'second'];
      manager.getFlow().should.eql(['first', 'second', {}]);
    });

    it('appends the referentially same item every time', () => {
      const flow1 = manager.getFlow();
      flow1.should.eql([{}]);

      const flow2 = manager.getFlow();
      flow2.should.eql([{}]);

      flow1[0].should.equal(flow2[0]);
    });
  });

  describe('#checkIndices()', () => {
    beforeEach(() => {
      isEmpty.withArgs('zero').returns(true);
      isEmpty.withArgs('one').returns(true);
      isEmpty.withArgs('two').returns(false);
      isEmpty.withArgs('three').returns(false);

      manager = new ArrayManager(config);
      manager.current = ['zero', 'one', 'two', 'three'];
    });

    it('removes only empty items in specified indices', () => {
      manager.checkIndices([0, 1, 2, 3]);
      manager.current.should.eql(['two', 'three']);
    });

    it('removes empty items only in specified indices', () => {
      manager.checkIndices([0, 2]);
      manager.current.should.contain('one');
    });

    it('returns true if an item has been removed', () => {
      manager.checkIndices([0]).should.be.true;
    });

    it('returns false if no items have been removed', () => {
      manager.checkIndices([2]).should.be.false;
    });

    it('handles unordered indices', () => {
      manager.checkIndices([2, 0, 3, 1]);
      manager.current.should.eql(['two', 'three']);
    });

    it('ignores empty indices', () => {
      manager.checkIndices([]);
      manager.current.should.contain('zero');
      manager.current.should.contain('one');
    });
  });

  describe('#checkItem()', () => {
    beforeEach(() => {
      isEmpty.withArgs('zero').returns(true);
      isEmpty.withArgs('one').returns(true);
      isEmpty.withArgs('two').returns(false);
      isEmpty.withArgs('three').returns(false);

      manager = new ArrayManager(config);
      manager.current = ['zero', 'one', 'two', 'three'];
    });

    it('removes specified item', () => {
      manager.checkItem('zero');
      manager.current.should.eql(['one', 'two', 'three']);
    });

    it('removes all occurrences of specified item', () => {
      manager.current.push('zero');
      manager.checkItem('zero');
      manager.current.should.eql(['one', 'two', 'three']);
    });

    it('does not remove a non-empty item', () => {
      manager.checkItem('two');
      manager.current.should.eql(['zero', 'one', 'two', 'three']);
    });

    it('returns true if an item has been removed', () => {
      manager.checkItem('zero').should.be.true;
    });

    it('returns false if no items have been removed', () => {
      manager.checkItem('three').should.be.false;
    });

    it('ignores items that do not occur in the current array', () => {
      manager.checkItem('four');
      manager.current.should.eql(['zero', 'one', 'two', 'three']);
    });
  });

  describe('#checkTail()', () => {
    const flowItem = { id: 'flow' };

    beforeEach(() => {
      createEmptyItem.returns(flowItem);
      isEmpty.withArgs(flowItem).returns(true);

      manager = new ArrayManager(config);
    });

    it('appends a non-empty flow item to the array', () => {
      isEmpty.withArgs(flowItem).returns(false);

      manager.checkTail();
      manager.current.should.eql([flowItem]);
    });

    it('creates a new flow item after appending', () => {
      isEmpty.withArgs(flowItem).returns(false);

      const newFlowItem = {};
      createEmptyItem.returns(newFlowItem);

      manager.checkTail();
      manager.getFlow().should.eql([flowItem, newFlowItem]);
    });

    it('returns true if the flow item has been appended', () => {
      isEmpty.withArgs(flowItem).returns(false);

      manager.checkTail().should.be.true;
    });

    it('does not append an empty flow item to the array', () => {
      isEmpty.withArgs(flowItem).returns(true);

      manager.checkTail();
      manager.current.should.be.empty;
    });

    it('removes an empty last item from the array', () => {
      const lastItem = { id: 'last' };
      manager.current = [lastItem];
      isEmpty.withArgs(lastItem).returns(true);

      manager.checkTail();
      manager.current.should.be.empty;
    });

    it('moves the exact same item to the flow', () => {
      const lastItem = { id: 'last' };
      manager.current = [lastItem];
      isEmpty.withArgs(lastItem).returns(true);

      manager.checkTail();
      manager.getFlow().should.eql([lastItem]);
    });

    it('returns true if the last item has been removed', () => {
      const lastItem = { id: 'last' };
      manager.current = [lastItem];
      isEmpty.withArgs(lastItem).returns(true);

      manager.checkTail().should.be.true;
    });

    it('does not remove a non-empty last item from the array', () => {
      const lastItem = { id: 'last' };
      manager.current = [lastItem];
      isEmpty.withArgs(lastItem).returns(false);
      isEmpty.withArgs(flowItem).returns(true);

      manager.checkTail();
      manager.current.should.eql([lastItem]);
    });

    it('does not attempt to check the last item if the array is empty', () => {
      manager.checkTail().should.not.throw;
      manager.current.should.be.empty;
    });

    it('returns false if no item has been removed or appended', () => {
      manager.checkTail().should.be.false;
    });
  });
});
