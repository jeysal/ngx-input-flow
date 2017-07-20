import 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { EmptinessConfiguration } from '../config/emptiness-configuration';
import { FocusTracker } from '../model/focus-tracker';
import { ArrayManager } from '../service/array-manager';
import { InputFlowModelDirective } from './ngx-input-flow-model.directive';

chai.use(sinonChai);

describe('InputFlowModelDirective', () => {
  let tracker: FocusTracker<object>;
  let manager: ArrayManager<object>;
  let inputFlowModel: InputFlowModelDirective<object>;

  beforeEach(() => {
    tracker = new FocusTracker();
    manager = new ArrayManager(new EmptinessConfiguration());
    inputFlowModel = new InputFlowModelDirective(tracker, manager);

    inputFlowModel.ngxInputFlowModel = {};
  });

  describe('#onFocusout()', () => {
    it('should store the item that has lost focus', () => {
      inputFlowModel.onFocusout();

      (tracker.lastFocused as object).should.equal(
        inputFlowModel.ngxInputFlowModel,
      );
    });
  });

  describe('#onFocusin()', () => {
    let checkItem: sinon.SinonSpy;

    beforeEach(() => {
      checkItem = sinon.spy(manager, 'checkItem');
    });

    it('does not check anything on the first focusin', () => {
      inputFlowModel.onFocusin();
      checkItem.should.not.have.been.called;
    });

    it('checks the previously focused item on focusin', () => {
      tracker.lastFocused = { val: 1 };
      inputFlowModel.ngxInputFlowModel = { val: 2 };

      inputFlowModel.onFocusin();
      checkItem.should.have.been.calledWith(tracker.lastFocused);
    });

    it('does not recheck the item itself on focusin', () => {
      tracker.lastFocused = inputFlowModel.ngxInputFlowModel;
      inputFlowModel.onFocusin();
      checkItem.should.not.have.been.called;
    });
  });

  describe('#onInput', () => {
    let checkTail: sinon.SinonSpy;

    beforeEach(() => {
      checkTail = sinon.spy(manager, 'checkTail');
    });

    it('checks the tail', () => {
      inputFlowModel.onInput();

      checkTail.should.have.been.calledOnce;
    });
  });
});
