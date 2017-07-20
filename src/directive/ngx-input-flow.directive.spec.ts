import { IterableDiffers } from '@angular/core';
import 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { EmptinessConfiguration } from '../config/emptiness-configuration';
import { ElementCheckSetting } from '../model/element-check-setting';
import { ArrayManager } from '../service/array-manager';
import { InputFlowDirective } from './ngx-input-flow.directive';

chai.use(sinonChai);

describe('The InputFlowDirective', () => {
  let config: EmptinessConfiguration;
  let manager: ArrayManager<object>;
  let differs: IterableDiffers;
  let inputFlow: InputFlowDirective<object>;

  beforeEach(() => {
    config = new EmptinessConfiguration();
    manager = new ArrayManager(config);
    differs = new IterableDiffers([]);
    inputFlow = new InputFlowDirective(manager, config, differs);
  });

  let find: sinon.SinonStub;

  beforeEach(() => {
    find = sinon.stub(differs, 'find').returns({
      create: () => ({}),
    });
  });

  describe('[ngxInputFlow] input', () => {
    it('updates the current iterable on reference change', done => {
      inputFlow.ngxInputFlowChange.subscribe((arr: object[]) => {
        arr.should.eql([{}]);
        done();
      });

      inputFlow.ngxInputFlow = [{}];
      manager.current.should.eql([{}]);
    });

    it('converts given iterable to an array', done => {
      inputFlow.ngxInputFlowChange.subscribe((arr: object[]) => {
        arr.should.eql([{}]);
        done();
      });

      inputFlow.ngxInputFlow = new Set([{}]);
      manager.current.should.eql([{}]);
    });

    it('does not update the current iterable if reference is the same', done => {
      inputFlow.ngxInputFlowChange.subscribe(
        () => chai.assert.fail(),
        undefined,
        () => done(),
      );

      const arr = manager.current;
      inputFlow.ngxInputFlow = arr;
      manager.current.should.equal(arr);

      inputFlow.ngxInputFlowChange.complete();
    });

    it('does not query for a new differ every time', () => {
      inputFlow.ngxInputFlow = [];
      inputFlow.ngxInputFlow = [];

      find.should.have.been.calledOnce;
    });
  });

  describe('.flow() function', () => {
    it('delegates to the manager flow', () => {
      const flow: object[] = [];
      sinon.stub(manager, 'getFlow').returns(flow);

      inputFlow.flow().should.equal(flow);
    });
  });

  describe('[emptyItem] input', () => {
    it('forwards to the config', () => {
      const emptyItem = () => null;
      inputFlow.emptyItem = emptyItem;
      config.createEmptyItem.should.equal(emptyItem);
    });
  });

  describe('[emptyWhen] input', () => {
    it('forwards to the config', () => {
      const emptyWhen = (item: any) => false;
      inputFlow.emptyWhen = emptyWhen;
      config.isEmpty.should.equal(emptyWhen);
    });
  });

  describe('ngDoCheck() lifecycle hook', () => {
    let checkTail: sinon.SinonStub;
    let checkIndices: sinon.SinonStub;

    beforeEach(() => {
      checkTail = sinon.stub(manager, 'checkTail');
      checkIndices = sinon.stub(manager, 'checkIndices');
    });

    it('does not check anything if the iterable is not initialized', () => {
      inputFlow.ngDoCheck();

      checkTail.should.not.have.been.called;
      checkIndices.should.not.have.been.calledWith(
        sinon.match((arr: number[]) => arr && arr.length),
      );
    });

    describe('with checkElements="None"', () => {
      beforeEach(() => {
        inputFlow.ngxInputFlow = [];
        inputFlow.checkElements = ElementCheckSetting[ElementCheckSetting.None];
      });

      it('does not check anything', () => {
        inputFlow.ngxInputFlow = [];
        inputFlow.ngDoCheck();

        checkTail.should.not.have.been.called;
        checkIndices.should.not.have.been.calledWith(
          sinon.match((arr: number[]) => arr && arr.length),
        );
      });
    });

    describe('with checkElements="All"', () => {
      beforeEach(() => {
        inputFlow.ngxInputFlow = [{}, {}, {}];
        inputFlow.checkElements = ElementCheckSetting[ElementCheckSetting.All];
      });

      it('checks the tail', () => {
        inputFlow.ngDoCheck();
        checkTail.should.have.been.calledOnce;
      });

      it('checks all indices', () => {
        inputFlow.ngDoCheck();
        checkIndices.should.have.been.calledWith([0, 1, 2]);
      });
    });

    describe('with checkElements="New"', () => {
      let diff: sinon.SinonStub;

      beforeEach(() => {
        diff = sinon.stub();
        find.returns({ create: () => ({ diff }) });

        inputFlow.ngxInputFlow = [{}, {}, {}];
        inputFlow.checkElements = ElementCheckSetting[ElementCheckSetting.New];
      });

      it('checks the indices the differ reports as added', () => {
        const indices = [0, 2];
        diff.withArgs(manager.current).returns({
          forEachAddedItem: (
            consumer: ((record: { currentIndex: number }) => void),
          ) => {
            indices.forEach(i => consumer({ currentIndex: i }));
          },
        });

        inputFlow.ngDoCheck();

        checkIndices.should.have.been.calledWith(indices);
      });

      it('does not check a null index the differ reports as added', () => {
        const index = 1;
        diff.withArgs(manager.current).returns({
          forEachAddedItem: (
            consumer: ((record: { currentIndex: number | null }) => void),
          ) => {
            [index, null].forEach(i => consumer({ currentIndex: i }));
          },
        });

        inputFlow.ngDoCheck();

        checkIndices.should.have.been.calledWith([index]);
      });

      it('does not check anything if the differ returns null', () => {
        diff.withArgs(manager.current).returns(null);

        inputFlow.ngDoCheck();

        checkTail.should.not.have.been.called;
        checkIndices.should.not.have.been.calledWith(
          sinon.match((arr: number[]) => arr && arr.length),
        );
      });
    });
  });
});
