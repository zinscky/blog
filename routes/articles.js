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
    utils.sendJsonResponse(res, 201, true, article, null);
  });
});

//==============================================================================
// Get all Articles
// GET - api/v1/articles?page={}&limit={}
// page = page number
// limit = number of articles per page
//==============================================================================
router.get("/", function(req, res) {
  
  var page = req.query.page || 0;
  var limit = req.query.limit || 10;
  
  
  Article.getAllArticles(page, limit, function(err, articles) {
    if(err) throw err;
    utils.sendJsonResponse(res, 200, true, articles, null);
  });
});

module.exports = router;
