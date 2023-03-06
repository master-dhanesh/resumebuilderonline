const express = require("express");
const router = express.Router();

const {
    homepage,
    signupuser,
    signinuser,
    signoutuser,
} = require("../controllers/indexControllers");

// @route GET /
router.get("/", homepage);

// @route POST /signup
router.post("/signup", signupuser);

// @route POST /signin
router.post("/signin", signinuser);

// @route get /signout
router.get("/signuout", signoutuser);

module.exports = router;
