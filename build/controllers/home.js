"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPage = void 0;

var indexPage = function indexPage(req, res) {
  return res.status(200).json({
    message: 'Home controller updated..'
  });
};

exports.indexPage = indexPage;