'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasError = require('../hasError');

var _hasError2 = _interopRequireDefault(_hasError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIsValid = function createIsValid(structure) {
  var getIn = structure.getIn;

  var hasError = (0, _hasError2.default)(structure);
  return function (form) {
    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
      return getIn(state, 'form');
    };
    return function (state) {
      var formState = getFormState(state);
      var syncError = getIn(formState, form + '.syncError');
      if (syncError) {
        return false;
      }
      var syncErrors = getIn(formState, form + '.syncErrors');
      var asyncErrors = getIn(formState, form + '.asyncErrors');
      var submitErrors = getIn(formState, form + '.submitErrors');
      if (!syncErrors && !asyncErrors && !submitErrors) {
        return true;
      }

      var registeredFields = getIn(formState, form + '.registeredFields') || [];
      return !registeredFields.some(function (field) {
        return hasError(field, syncErrors, asyncErrors, submitErrors);
      });
    };
  };
};

exports.default = createIsValid;