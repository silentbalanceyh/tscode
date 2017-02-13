'use strict';

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _plain = require('../structure/plain/index');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../structure/immutable/index');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('./addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

var _reducerInitialize = require('./reducer.initialize.spec.js');

var _reducerInitialize2 = _interopRequireDefault(_reducerInitialize);

var _reducerArrayInsert = require('./reducer.arrayInsert.spec.js');

var _reducerArrayInsert2 = _interopRequireDefault(_reducerArrayInsert);

var _reducerArrayMove = require('./reducer.arrayMove.spec.js');

var _reducerArrayMove2 = _interopRequireDefault(_reducerArrayMove);

var _reducerArrayPop = require('./reducer.arrayPop.spec.js');

var _reducerArrayPop2 = _interopRequireDefault(_reducerArrayPop);

var _reducerArrayPush = require('./reducer.arrayPush.spec.js');

var _reducerArrayPush2 = _interopRequireDefault(_reducerArrayPush);

var _reducerArrayRemove = require('./reducer.arrayRemove.spec.js');

var _reducerArrayRemove2 = _interopRequireDefault(_reducerArrayRemove);

var _reducerArrayRemoveAll = require('./reducer.arrayRemoveAll.spec.js');

var _reducerArrayRemoveAll2 = _interopRequireDefault(_reducerArrayRemoveAll);

var _reducerArrayShift = require('./reducer.arrayShift.spec.js');

var _reducerArrayShift2 = _interopRequireDefault(_reducerArrayShift);

var _reducerArraySplice = require('./reducer.arraySplice.spec.js');

var _reducerArraySplice2 = _interopRequireDefault(_reducerArraySplice);

var _reducerArraySwap = require('./reducer.arraySwap.spec.js');

var _reducerArraySwap2 = _interopRequireDefault(_reducerArraySwap);

var _reducerArrayUnshift = require('./reducer.arrayUnshift.spec.js');

var _reducerArrayUnshift2 = _interopRequireDefault(_reducerArrayUnshift);

var _reducerAutofill = require('./reducer.autofill.spec.js');

var _reducerAutofill2 = _interopRequireDefault(_reducerAutofill);

var _reducerBlur = require('./reducer.blur.spec.js');

var _reducerBlur2 = _interopRequireDefault(_reducerBlur);

var _reducerChange = require('./reducer.change.spec.js');

var _reducerChange2 = _interopRequireDefault(_reducerChange);

var _reducerDestroy = require('./reducer.destroy.spec.js');

var _reducerDestroy2 = _interopRequireDefault(_reducerDestroy);

var _reducerFocus = require('./reducer.focus.spec.js');

var _reducerFocus2 = _interopRequireDefault(_reducerFocus);

var _reducerTouch = require('./reducer.touch.spec.js');

var _reducerTouch2 = _interopRequireDefault(_reducerTouch);

var _reducerReset = require('./reducer.reset.spec.js');

var _reducerReset2 = _interopRequireDefault(_reducerReset);

var _reducerPlugin = require('./reducer.plugin.spec.js');

var _reducerPlugin2 = _interopRequireDefault(_reducerPlugin);

var _reducerStartSubmit = require('./reducer.startSubmit.spec.js');

var _reducerStartSubmit2 = _interopRequireDefault(_reducerStartSubmit);

var _reducerStopSubmit = require('./reducer.stopSubmit.spec.js');

var _reducerStopSubmit2 = _interopRequireDefault(_reducerStopSubmit);

var _reducerSetSubmitFailed = require('./reducer.setSubmitFailed.spec.js');

var _reducerSetSubmitFailed2 = _interopRequireDefault(_reducerSetSubmitFailed);

var _reducerSetSubmitSuceeded = require('./reducer.setSubmitSuceeded.spec.js');

var _reducerSetSubmitSuceeded2 = _interopRequireDefault(_reducerSetSubmitSuceeded);

var _reducerStartAsyncValidation = require('./reducer.startAsyncValidation.spec.js');

var _reducerStartAsyncValidation2 = _interopRequireDefault(_reducerStartAsyncValidation);

var _reducerStopAsyncValidation = require('./reducer.stopAsyncValidation.spec.js');

var _reducerStopAsyncValidation2 = _interopRequireDefault(_reducerStopAsyncValidation);

var _reducerRegisterField = require('./reducer.registerField.spec.js');

var _reducerRegisterField2 = _interopRequireDefault(_reducerRegisterField);

var _reducerUnregisterField = require('./reducer.unregisterField.spec.js');

var _reducerUnregisterField2 = _interopRequireDefault(_reducerUnregisterField);

var _reducerUntouch = require('./reducer.untouch.spec.js');

var _reducerUntouch2 = _interopRequireDefault(_reducerUntouch);

var _reducerUpdateSyncErrors = require('./reducer.updateSyncErrors.spec.js');

var _reducerUpdateSyncErrors2 = _interopRequireDefault(_reducerUpdateSyncErrors);

var _reducerUpdateSyncWarnings = require('./reducer.updateSyncWarnings.spec.js');

var _reducerUpdateSyncWarnings2 = _interopRequireDefault(_reducerUpdateSyncWarnings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tests = {
  initialize: _reducerInitialize2.default,
  arrayInsert: _reducerArrayInsert2.default,
  arrayMove: _reducerArrayMove2.default,
  arrayPop: _reducerArrayPop2.default,
  arrayPush: _reducerArrayPush2.default,
  arrayRemove: _reducerArrayRemove2.default,
  arrayRemoveAll: _reducerArrayRemoveAll2.default,
  arrayShift: _reducerArrayShift2.default,
  arraySplice: _reducerArraySplice2.default,
  arraySwap: _reducerArraySwap2.default,
  arrayUnshift: _reducerArrayUnshift2.default,
  autofill: _reducerAutofill2.default,
  blur: _reducerBlur2.default,
  change: _reducerChange2.default,
  destroy: _reducerDestroy2.default,
  focus: _reducerFocus2.default,
  reset: _reducerReset2.default,
  touch: _reducerTouch2.default,
  setSubmitFailed: _reducerSetSubmitFailed2.default,
  setSubmitSucceeded: _reducerSetSubmitSuceeded2.default,
  startSubmit: _reducerStartSubmit2.default,
  stopSubmit: _reducerStopSubmit2.default,
  startAsyncValidation: _reducerStartAsyncValidation2.default,
  stopAsyncValidation: _reducerStopAsyncValidation2.default,
  registerField: _reducerRegisterField2.default,
  unregisterField: _reducerUnregisterField2.default,
  untouch: _reducerUntouch2.default,
  updateSyncErrors: _reducerUpdateSyncErrors2.default,
  updateSyncWarnings: _reducerUpdateSyncWarnings2.default,
  plugin: _reducerPlugin2.default
};

var describeReducer = function describeReducer(name, structure, expect) {
  var reducer = (0, _reducer2.default)(structure);

  describe(name, function () {
    it('should initialize state to {}', function () {
      var state = reducer();
      expect(state).toExist().toBeAMap().toBeSize(0);
    });

    it('should not modify state when action has no form', function () {
      var state = { foo: 'bar' };
      expect(reducer(state, { type: 'SOMETHING_ELSE' })).toBe(state);
    });

    it('should not modify state when action has form, but unknown type', function () {
      var state = { foo: 'bar' };
      expect(reducer(state, { type: 'SOMETHING_ELSE', form: 'foo' })).toBe(state);
    });

    it('should initialize form state when action has form', function () {
      var state = reducer(undefined, { meta: { form: 'foo' } });
      expect(state).toExist().toBeAMap().toBeSize(1).toEqualMap({
        foo: {}
      });
    });

    Object.keys(tests).forEach(function (key) {
      describe(name + '.' + key, tests[key](reducer, expect, structure));
    });
  });
};
describeReducer('reducer.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeReducer('reducer.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));
