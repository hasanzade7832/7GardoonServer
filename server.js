const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// security
const helmet = require("helmet");
const xssCleaner = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// mid
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xssCleaner());
app.use(mongoSanitize());
app.use(hpp());

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "this is 7Gardoon file shop course server...",
  });
});

const bannerRoutes = require("./routes/bannerRoutes");
const postsRoutes = require("./routes/postRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
app.use("/api", bannerRoutes);
app.use("/api", postsRoutes);
app.use("/api", sliderRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then((d) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
