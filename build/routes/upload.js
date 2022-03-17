"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../controllers/index.js");

var _upload = require("../middleware/upload.js");

var uploadRouter = _express["default"].Router();

uploadRouter.post("/", _upload.uploadFile.single("file"), _index.upload);
var _default = uploadRouter;
exports["default"] = _default;