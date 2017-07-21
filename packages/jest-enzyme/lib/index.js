'use strict';

var _enzymeMatchers = require('enzyme-matchers');

var _enzymeMatchers2 = _interopRequireDefault(_enzymeMatchers);

var _serializer = require('enzyme-to-json/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
} /* eslint-disable new-cap */
/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule setupTestFrameworkScriptFile
 * 
 */

// add the snapshot serializer for Enzyme wrappers
expect.addSnapshotSerializer(_serializer2.default);

// add methods!
beforeEach(function() {
  var matchers = {};

  Object.keys(_enzymeMatchers2.default).forEach(function(matcherKey) {
    var matcher = _defineProperty({}, matcherKey, function(wrapper) {
      var _enzymeMatchers$match;

      for (
        var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      var result = (_enzymeMatchers$match =
        _enzymeMatchers2.default[matcherKey]).call.apply(
        _enzymeMatchers$match,
        [this, wrapper].concat(_toConsumableArray(args)),
      );

      if (this.isNot) {
        result.message = result.negatedMessage;
      }

      if (result.contextualInformation.expected) {
        result.message +=
          '\n' +
          this.utils.RECEIVED_COLOR(result.contextualInformation.expected);
      }

      if (result.contextualInformation.actual) {
        result.message +=
          '\n' + this.utils.EXPECTED_COLOR(result.contextualInformation.actual);
      }

      return result;
    })[matcherKey];

    matchers[matcherKey] = matcher;
  });

  expect.extend(matchers);
});