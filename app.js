if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const pg = require("pg");

const errorHandler = require("./middleware/errorHandler");
const app = express();

const router = require("./routers/index");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "API is running",
//   });
// });

app.use(router);

app.use(errorHandler);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

module.exports = app;
