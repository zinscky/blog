"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Article = require("../models/article");
var validator = require("../utils/myValidator");

var utils = require("../utils/utility");

//==============================================================================
// Create a new Article.
// POST - api/v1/articles
//==============================================================================
router.post("/", require("./auth"), function(req, res) {
  var newArticle = new Article();
  newArticle.title = req.body.title;
  newArticle.body = req.body.body;
  newArticle.author = req.token.user_id;

  Article.createNewArticle(newArticle, function(err, article) {
    if(err) throw err;
    utils.sendResponse(res, 201, true, article, null);
  });
});

//==============================================================================
// Get all Articles
// GET - api/v1/articles
//==============================================================================
router.get("/", function(req, res) {
  Article.getAllArticles(function(err, articles) {
    if(err) throw err;
    utils.sendResponse(res, 200, true, articles, null);
  });
});

module.exports = router;
