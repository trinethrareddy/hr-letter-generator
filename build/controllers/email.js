"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendAnEmail = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _nodejsNodemailerOutlook = _interopRequireDefault(require("nodejs-nodemailer-outlook"));

var sendAnEmail = function sendAnEmail(req, res) {
  try {
    _nodejsNodemailerOutlook["default"].sendEmail({
      // auth: {
      //     user: "trinethra.a@tadigital.com",
      //     pass: "3Nethra@01"
      // },
      auth: {
        user: "employeereviews@techaspect.com",
        pass: "Voh14094"
      },
      from: 'trinethra.a@tadigital.com',
      to: 'trinethra.a@tadigital.com',
      subject: 'Hey you, awesome!',
      html: '<b>This is bold text</b>',
      text: 'This is text version!',
      replyTo: 'receiverXXX@gmail.com',
      attachments: [{
        filename: 'text1.txt',
        content: 'hello world!'
      }, {
        // binary buffer as an attachment
        filename: 'text2.txt',
        content: new Buffer('hello world!', 'utf-8')
      }, // {   // file on disk as an attachment
      //     filename: 'text3.txt',
      //     path: '/path/to/file.txt' // stream this file
      // },
      // {   // filename and content type is derived from path
      //     path: '/path/to/file.txt'
      // },
      {
        // stream as an attachment
        filename: 'text4.txt',
        content: _fs["default"].createReadStream('file.txt')
      }, {
        // define custom content type for the attachment
        filename: 'text.bin',
        content: 'hello world!',
        contentType: 'text/plain'
      }, {
        // use URL as an attachment
        filename: 'license.txt',
        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
      }, {
        // encoded string as an attachment
        filename: 'text1.txt',
        content: 'aGVsbG8gd29ybGQh',
        encoding: 'base64'
      }, {
        // data uri as an attachment
        path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
      }, {
        // use pregenerated MIME node
        raw: 'Content-Type: text/plain\r\n' + 'Content-Disposition: attachment;\r\n' + '\r\n' + 'Hello world!'
      }],
      onError: function onError(e) {
        return console.log(e);
      },
      onSuccess: function onSuccess(i) {
        return console.log(i);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Something went wrong!"
    });
  }
};

exports.sendAnEmail = sendAnEmail;