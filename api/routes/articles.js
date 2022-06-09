const express = require("express");

const router = express.Router();
const {getAllArticles, getArticle,createArticle ,  updateArticle,deleteArticle } = require("../controllers/articles");
const upload = require("../middlewarse/upload");


router.get("/", getAllArticles);
router.post("/",upload.single('image') , createArticle);
router.patch("/:articleId", updateArticle);
router.delete("/:articleId", deleteArticle);
router.get("/:articleId", getArticle);


module.exports = router;
