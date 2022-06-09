const Article = require("../models/article");
const Category = require("../models/category");
const mongoose = require("mongoose");
module.exports = {
  getAllArticles: (req, res) => {
    Article.find()
      .populate("categoryId", "title")
      .then((articles) => {
        res.status(200).json(articles);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error to get All Articles",
          error: err,
        });
      });
  },
  getArticle: (req, res) => {
    const articleId = req.params.articleId;
    Article.findById(articleId)
      .then((article) => {
        res.status(200).json(article);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error to get Article",
          error: err,
        });
      });
  },
  createArticle: (req, res) => {
    const { title, description, content, categoryId } = req.body;
    console.log(req.file.path);
    const { path: image } = req.file;
    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category not found",
          });
        }
        const article = new Article({
          _id: new mongoose.Types.ObjectId(),
          title,
          description,
          content,
          categoryId,
          image: image.replace(/\\/g, "/"),
        });
        article
          .save()
          .then(() => {
            res.status(200).json({
              message: "create article",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "error to create article",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error to get Category",
          error: err,
        });
      });
  },
  updateArticle: (req, res) => {
    const articleId = req.params.articleId;
    const { categoryId } = req.body;

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category not found",
          });
        }
        Article.findByIdAndUpdate(articleId, req.body)
          .then(() => {
            res.status(200).json({
              message: "update article",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "error to update article",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error to get Category",
          error: err,
        });
      });
  },
  deleteArticle: (req, res) => {
    const articleId = req.params.articleId;
    Article.findByIdAndDelete(articleId)
      .then(() => {
        res.status(200).json({
          message: `delete article ${articleId}`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error to delete Article",
          error: err,
        });
      });
  },
};
