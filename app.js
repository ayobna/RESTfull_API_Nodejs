const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose=require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles.daatrl2.mongodb.net/?retryWrites=true&w=majority`,
{useNewUrlParser:true , useUnifiedTopology:true
});
mongoose.connection.on("connected",()=>{
    console.log("connected to mongoose");
});

const articlesRouter = require("./api/routes/articles");
const categoriesRouter = require("./api/routes/categories");
const usersRouter = require("./api/routes/users");

app.use(morgan("dev"));

app.use(express.json());
app.use('/uploads' , express.static("uploads"));
app.use(express.urlencoded({ extended: false }));

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



//ROUTES
app.use("/articles", articlesRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);

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