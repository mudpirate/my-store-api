require("dotenv").config();
require("express-async-errors");

//async error

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// const { default: mongoose } = require("mongoose");
const productsRouter = require("./routes/products");

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send(
    `<h1> store api </h1> <a href = "/api/v1/products">products route</a>`
  );
});

app.use("/api/v1/products", productsRouter);

//products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 1000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server running ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
