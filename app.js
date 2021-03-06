const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./controllers/auth/auth-middleware");
const authRouter = require("./controllers/auth/auth-router");
const router = require("./routes");
const errorHandler = require("./errors/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", router);

app.use(errorHandler);

module.exports = app;
