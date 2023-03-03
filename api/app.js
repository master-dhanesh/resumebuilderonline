require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// logging
const logger = require("morgan");
app.use(logger("tiny"));
// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const indexRoute = require("./routes/indexRoutes");

app.use("/", indexRoute);

app.listen(
    process.env.PORT,
    console.log(`Server running on port ${process.env.PORT}`)
);
