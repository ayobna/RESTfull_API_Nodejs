const multer = require("multer");

const filters = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + Date.now() + file.originalname); //image-1598439899999-image.png;
  },
});

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage,
  filters,
});

module.exports = upload;
