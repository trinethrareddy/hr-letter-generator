"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPage = exports.getTemplates = void 0;

var indexPage = function indexPage(req, res) {
  return res.status(200).json({
    message: 'Home controller updated..'
  });
};

exports.indexPage = indexPage;

var getTemplates = function getTemplates(req, res) {
  res.status(200).json({
    message: 'Successfully fetched templates',
    data: ['Bonus Letter', 'Only Hike Letter', 'Promotion Letter', 'Hike with Promotion Letter']
  });
};

exports.getTemplates = getTemplates;