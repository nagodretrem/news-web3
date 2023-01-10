const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const corsOptions = require("./src/helpers/corsOptions");
const router = require("./src/routers");
require("./src/db/dbConnection");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

//Cors
app.use(cors(corsOptions));

//Sanitize data to prevent NoSQL injection
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hoş Geldiniz",
  });
});

app.use("/api", router);

//Error cacth
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is runnig at http://localhost:${port}`);
});
