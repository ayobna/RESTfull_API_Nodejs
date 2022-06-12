const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles.daatrl2.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const articlesRouter = require("./api/routes/articles");
const categoriesRouter = require("./api/routes/categories");
const usersRouter = require("./api/routes/users");
const checkAuth = require("./api/middleware/checkAuth");

app.use((req, res, next) => {
  //middleware
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//ROUTES
app.use("/api/articles", articlesRouter);
app.use("/api/categories", checkAuth, categoriesRouter);
app.use("/api/users", usersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error); //this will call the error handler
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
