const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const upload = require("../middleware/upload");
const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", getAllArticles);
router.get("/:articleId", getArticle);
router.post("/", checkAuth, upload.single("image"), createArticle);
router.patch("/:articleId",checkAuth, updateArticle);
router.delete("/:articleId",checkAuth, deleteArticle);

module.exports = router;
