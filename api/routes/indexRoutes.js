const express = require("express");
const router = express.Router();

const { create, homepage } = require("../controllers/indexControllers");

// @route GET /
router.get("/", homepage);

// @route POST /create
router.post("/create", create);

module.exports = router;
