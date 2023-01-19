const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const router = require("./src/routers");
const errorHandler = require("./src/middlewares/errorHandler");
const connectDB = require("./src/db/dbConnection");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
connectDB();

//Cors
app.use(cors({ origin: "*" }));

//Sanitize data to prevent NoSQL injection
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));

//Routes

app.use("/", router);

//Error cacth
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is runnig at http://localhost:${port}`);
});
