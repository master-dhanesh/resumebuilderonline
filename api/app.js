require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// database connection
require("./models/database").databaseconnection();

// logging
const logger = require("morgan");
app.use(logger("tiny"));
// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const indexRoute = require("./routes/indexRoutes");
app.use("/", indexRoute);

// error handler
const ErrorHandler = require("./utils/ErrorHandler");
const { createErrors } = require("./middleware/errors");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Request URL ${req.path} not found`, 404));
});
app.use(createErrors);

app.listen(
    process.env.PORT,
    console.log(`Server running on port ${process.env.PORT}`)
);
