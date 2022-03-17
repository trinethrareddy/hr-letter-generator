"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _upload = _interopRequireDefault(require("./routes/upload.js"));

var _email = _interopRequireDefault(require("./routes/email.js"));

var _cors = _interopRequireDefault(require("cors"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])());
app.use('/api', _index["default"]);
app.use('/api/upload', _upload["default"]);
app.use('/api/sendEmail', _email["default"]);
var _default = app;
exports["default"] = _default;