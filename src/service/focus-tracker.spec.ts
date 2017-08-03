import 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ArrayManager } from './array-manager';
import { FocusTracker } from './focus-tracker';

describe('The FocusTracker', () => {
  let timer: sinon.SinonFakeTimers;
  let checkItems: sinon.SinonSpy;
  let tracker: FocusTracker<object>;
  let values: object[];

  beforeEach(() => {
    timer = sinon.useFakeTimers();
    checkItems = sinon.spy();
    tracker = new FocusTracker(({ checkItems } as any) as ArrayManager<object>);
    values = [{ val: 0 }, { val: 1 }, { val: 2 }];
  });

  afterEach(() => {
    timer.restore();
  });

  it('does not check anything prematurely', () => {
    tracker.focusin$.next({ element: values[0], debounce: 100 });
    tracker.focusout$.next({ element: values[0], debounce: 10 });

    checkItems.should.not.have.been.called;
  });

  it('checks touched elements after the specified debounce times', () => {
    tracker.focusin$.next({ element: values[0], debounce: 100 });
    tracker.focusout$.next({ element: values[0], debounce: 10 });

    timer.tick(20);
    checkItems.should.have.been.calledWithExactly([values[0]]);
  });

  it('performs intermediate checks', () => {
    tracker.focusin$.next({ element: values[0], debounce: 50 });
    tracker.focusout$.next({ element: values[0], debounce: 50 });

    timer.tick(60);
    checkItems.should.have.been.calledWith([values[0]]);

    tracker.focusin$.next({ element: values[1], debounce: 50 });
    tracker.focusout$.next({ element: values[1], debounce: 50 });

    timer.tick(60);
    checkItems.should.have.been.calledWith([values[1]]);

    tracker.focusin$.next({ element: values[2], debounce: 50 });
    tracker.focusout$.next({ element: values[2], debounce: 50 });

    timer.tick(60);
    checkItems.should.have.been.calledWith([values[2]]);
  });

  it('checks multiple distinct elements at once', () => {
    tracker.focusin$.next({ element: values[0], debounce: 50 });
    tracker.focusout$.next({ element: values[0], debounce: 50 });
    tracker.focusin$.next({ element: values[1], debounce: 50 });
    tracker.focusout$.next({ element: values[1], debounce: 50 });
    tracker.focusin$.next({ element: values[0], debounce: 50 });
    tracker.focusout$.next({ element: values[0], debounce: 50 });

    timer.tick(60);
    checkItems.should.have.been.calledWith([values[0], values[1]]);
  });

  it('should not check the currently focused element', () => {
    tracker.focusin$.next({ element: values[0], debounce: 10 });
    tracker.focusout$.next({ element: values[0], debounce: 10 });
    tracker.focusin$.next({ element: values[1], debounce: 10 });

    timer.tick(20);
    checkItems.should.not.have.been.calledWithMatch((arr: object[]) =>
      arr.includes(values[1]),
    );
  });
});
