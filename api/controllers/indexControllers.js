const User = require("../models/userModel");
const Resume = require("../models/resumeModel");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { sendtoken } = require("../utils/sendtoken");
const { sendmail } = require("../utils/sendmailotp");
const imagekit = require("../utils/imagekit").intiImagekit();

exports.homepage = (req, res, next) => {
    res.json({ message: "Homepage", id: req.id });
};

exports.getloggedinuser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.id).populate("resumes");
    res.status(200).json({
        success: true,
        user,
    });
});

exports.signupuser = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    sendtoken(user, 201, res);
});

exports.signinuser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = user.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

    sendtoken(user, 201, res);
});

exports.signoutuser = (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" });
};

exports.sendmailotp = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return next(new ErrorHandler("User not found", 404));
    sendmail(user, res, next);
});

exports.forgetpassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        .select("+password")
        .exec();
    if (!user) return next(new ErrorHandler("User not found", 404));

    if (req.body.otp !== user.otp) {
        return next(new ErrorHandler("Invalid OTP, try again", 500));
    }

    user.password = req.body.password;
    user.otp = "";
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password Changed Successfully",
    });
});

exports.resetpassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("+password").exec();
    const isMatch = user.comparepassword(req.body.oldpassword);
    if (!isMatch) return next(new ErrorHandler("Wrong password", 500));
    user.password = req.body.newpassword;
    await user.save();
    sendtoken(user, 201, res);
});

exports.updateuser = catchAsyncErrors(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "User updated successfully",
    });
});

exports.updateavatar = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedname = `resumebuilder-${Date.now()}${path.extname(
        file.name
    )}`;
    if (user.avatar.fileId !== "") {
        await imagekit.deleteFile(user.avatar.fileId);
    }
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedname,
    });
    user.avatar = { fileId, url };
    await user.save();
    res.status(200).json({
        success: true,
        message: "profile updated",
    });
});

exports.createresume = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    const newresume = new Resume(req.body);
    user.resumes.push(newresume._id);
    newresume.personalinfo = user._id;
    await newresume.save();
    await user.save();
    res.status(201).json({ success: true, message: "New resume created" });
});

exports.readsingleresume = catchAsyncErrors(async (req, res, next) => {
    const resume = await Resume.findById(req.params.id)
        .populate("personalinfo")
        .exec();
    res.status(200).json({ success: true, resume });
});
