import 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { EmptinessConfiguration } from '../config/emptiness-configuration';
import { ArrayManager } from '../service/array-manager';
import { FocusEvent, FocusTracker } from '../service/focus-tracker';
import { InputFlowModelDirective } from './ngx-input-flow-model.directive';

chai.use(sinonChai);

describe('InputFlowModelDirective', () => {
  let tracker: FocusTracker<object>;
  let focusins: FocusEvent<object>[];
  let focusouts: FocusEvent<object>[];

  let manager: ArrayManager<object>;
  let inputFlowModel: InputFlowModelDirective<object>;

  beforeEach(() => {
    tracker = new FocusTracker(manager);
    focusins = [];
    focusouts = [];
    tracker.focusin$.subscribe(e => focusins.push(e));
    tracker.focusout$.subscribe(e => focusouts.push(e));
    manager = new ArrayManager(new EmptinessConfiguration());
    inputFlowModel = new InputFlowModelDirective(tracker, manager);
    inputFlowModel.focusDebounce = 42;
  });

  describe(' with a bound model', () => {
    beforeEach(() => {
      inputFlowModel.ngxInputFlowModel = {};
    });

    it('should next() the item that has lost focus to the tracker', () => {
      inputFlowModel.onFocusout();

      focusouts.should.eql([
        {
          element: inputFlowModel.ngxInputFlowModel,
          debounce: 42,
        },
      ]);
    });

    it('should next() the item that has lost focus to the tracker', () => {
      inputFlowModel.onFocusin();

      focusins.should.eql([
        {
          element: inputFlowModel.ngxInputFlowModel,
          debounce: 42,
        },
      ]);
    });
  });

  describe(' without a bound model', () => {
    it('should not next() anything to the tracker on focusout', () => {
      inputFlowModel.onFocusout();
      focusouts.should.be.empty;
    });

    it('should not next() anything to the tracker on focusin', () => {
      inputFlowModel.onFocusin();
      focusins.should.be.empty;
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
