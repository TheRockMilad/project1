const { validationResult } = require("express-validator");
const autoBind = require("auto-bind");
const User = require("./../model/users");
const Article = require("./../model/article");

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Article = Article
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const message = [];
      const errors = result.array();
      for (const error of errors) {
        message.push(error.msg);
      }
      res.status(400).json({
        message: "validation Error",
        data: message,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }

  response({ res, message, code = 200, data = [] }) {
    res.status(code).json({
      message,
      data,
    });
  }
};
