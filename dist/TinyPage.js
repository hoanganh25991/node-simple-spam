"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TinyPage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const openDefaultPage = (() => {
  var _ref = _asyncToGenerator(function* (browser) {
    return yield browser.newPage();
  });

  return function openDefaultPage(_x) {
    return _ref.apply(this, arguments);
  };
})();

const config = {
  timeout: 30000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
};

let browser = null;
let firstRun = true;
let browserPromise = null;
const initBrowser = mergedOption => {
  if (!firstRun && browserPromise) return browserPromise;
  firstRun = false;
  return browserPromise = _puppeteer2.default.launch(mergedOption);
};

/**
 * Create tiny page
 * @param option
 * @returns {Promise.<*>}
 * @constructor
 */
const TinyPage = exports.TinyPage = (() => {
  var _ref2 = _asyncToGenerator(function* (option = {}) {
    const mergedOption = _extends({}, config, option);
    if (!browser) browser = yield initBrowser(mergedOption);
    return openDefaultPage(browser);
  });

  return function TinyPage() {
    return _ref2.apply(this, arguments);
  };
})();

TinyPage.closeBrowser = _asyncToGenerator(function* () {
  if (browser) yield browser.close();
  browser = null;
});

exports.default = TinyPage;