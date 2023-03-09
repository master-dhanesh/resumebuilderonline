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
    updateavatar,
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

// @route post /signout
router.post("/signout", isAuthenticatedUser, signoutuser);

// @route post /send-mail
router.post("/send-mail", sendmailotp);

// @route post /forget
router.post("/forget", forgetpassword);

// @route post /reset/:id
router.post("/reset/:id", isAuthenticatedUser, resetpassword);

// @route post /update/:id
router.post("/update/:id", isAuthenticatedUser, updateuser);

// @route post /avatar/:id
router.post("/avatar/:id", isAuthenticatedUser, updateavatar);

module.exports = router;
