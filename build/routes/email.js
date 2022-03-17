"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../controllers/index.js");

var emailRouter = _express["default"].Router();

emailRouter.post("/", _index.sendAnEmail);
var _default = emailRouter;
exports["default"] = _default;