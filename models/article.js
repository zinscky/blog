var mongoose = require("mongoose");
var User = require("./user");

var articleSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

var Article = module.exports = mongoose.model("Article", articleSchema);

// Create New Article
module.exports.createNewArticle = function(newArticle, done) {
  Article.create(newArticle, function(err, article) {
    if(err) return done(err, false);
    return done(false, article);
  });
};

// Get Article by ID
module.exports.getArticleById = function(article_id, done) {
  Article.findbyId(article_id, function(err, article) {
    if(err) return done(err, false);
    return done(false, article);
  });
};

// Get all Articles
module.exports.getAllArticles = function(done) {
  Article
    .find({})
    .populate("author")
    .exec(function(err, article) {
      if(err) return done(err, false);
      return done(false, article);
  });
};
