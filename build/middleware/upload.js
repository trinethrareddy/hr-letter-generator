"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;

var _multer = _interopRequireDefault(require("multer"));

var excelFilter = function excelFilter(req, file, cb) {
  if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
    cb(null, true);
  } else {
    cb("Please upload only excel file update.", false);
  }
};

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./resources/static/assets/uploads");
  },
  filename: function filename(req, file, cb) {
    console.log(file.originalname);
    cb(null, "".concat(Date.now(), "-bezkoder-").concat(file.originalname));
  }
});

var uploadFile = (0, _multer["default"])({
  storage: storage,
  fileFilter: excelFilter
});
exports.uploadFile = uploadFile;