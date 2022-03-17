"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.getLogs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _indexCommonjs = _interopRequireWildcard(require("read-excel-file/node/index.commonjs.js"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var unlinkAsync = (0, _util.promisify)(_fs["default"].unlink);

var updateActivityLogs = function updateActivityLogs(logObj) {
  var filePath = "./resources/static/assets/logs/activityLogs.json";
  var activityLogs = [];
  activityLogs.push(logObj);

  try {
    _fs["default"].readFile(filePath, function (err, content) {
      if (err) throw err;
      var parseJson = [];

      if (content) {
        parseJson = JSON.parse(content || '[]');
      }

      parseJson.unshift(logObj);

      _fs["default"].writeFile(filePath, JSON.stringify(parseJson.slice(0, 10), null, 4), function (err) {
        if (err) throw err;
      });
    });
  } catch (e) {
    console.warn('error::', e);
  }
};

var upload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var activityLog, path;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            activityLog = _objectSpread(_objectSpread({}, req.file), {}, {
              createdTime: new Date()
            });

            if (!(req.file == undefined)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).send("Please upload an excel file!"));

          case 4:
            path = "./resources/static/assets/uploads/" + req.file.filename;
            _context2.next = 7;
            return (0, _indexCommonjs.readSheetNames)(path).then(function (sheetNames) {
              var totalExcelData = {};
              sheetNames.forEach(function (sheetName, index) {
                (0, _indexCommonjs["default"])(path, {
                  sheet: sheetName
                }).then( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(rows) {
                    var keys, records;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            keys = [];

                            if (rows && rows.length) {
                              // keys = Object.values(rows[0]).map(key => key.replace(/ /g,''))
                              keys = Object.values(rows[0]);
                            }

                            rows.shift();
                            records = [];
                            rows.forEach(function (row) {
                              var record = {};
                              keys.forEach(function (key, index) {
                                record[key] = row[index];
                              });
                              records.push(record);
                            });
                            totalExcelData[sheetName] = records;

                            if (!(index === sheetNames.length - 1)) {
                              _context.next = 10;
                              break;
                            }

                            _context.next = 9;
                            return unlinkAsync(path);

                          case 9:
                            res.status(200).send({
                              message: "Uploaded the file successfully: " + req.file.originalname,
                              data: totalExcelData
                            });

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });
              updateActivityLogs(activityLog);
            });

          case 7:
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).send({
              message: "Could not upload the file: " + req.file.originalname
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Function to return activity logs which are saved in the activityLogs.json file 


exports.upload = upload;

var getLogs = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var filePath;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              filePath = "./resources/static/assets/logs/activityLogs.json";

              _fs["default"].readFile(filePath, function (err, content) {
                if (err) throw err;
                var parseJson = [];

                if (content) {
                  parseJson = JSON.parse(content || '[]');
                }

                res.status(200).send({
                  message: "Successfully fetched the logs",
                  data: parseJson
                });
              });
            } catch (error) {
              console.log(error);
              res.status(500).send({
                message: "Something went wrong!"
              });
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getLogs(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getLogs = getLogs;