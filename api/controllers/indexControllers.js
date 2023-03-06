const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

exports.homepage = (req, res, next) => {
    res.json({ message: "Homepage" });
};

exports.signupuser = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    res.status(201).json(user);
});

exports.signinuser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = user.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

    res.status(200).json(user);
});

exports.signoutuser = (req, res, next) => {
    res.json({ message: "Successfully signout!" });
};
