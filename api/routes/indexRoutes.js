const express = require("express");
const router = express.Router();

const {
    homepage,
    signupuser,
    signinuser,
    signoutuser,
    getloggedinuser,
    sendmailotp,
    forgetpassword,
    resetpassword,
    updateuser,
} = require("../controllers/indexControllers");
const { isAuthenticatedUser } = require("../middleware/auth");

// @route GET /
router.get("/", homepage);

// @route POST /me
router.post("/me", isAuthenticatedUser, getloggedinuser);

// @route POST /signup
router.post("/signup", signupuser);

// @route POST /signin
router.post("/signin", signinuser);

// @route get /signout
router.get("/signout", signoutuser);

// @route post /send-mail
router.post("/send-mail", sendmailotp);

// @route post /forget
router.post("/forget", forgetpassword);

// @route post /reset/:id
router.post("/reset/:id", resetpassword);

// @route post /update/:id
router.post("/update/:id", updateuser);

module.exports = router;
