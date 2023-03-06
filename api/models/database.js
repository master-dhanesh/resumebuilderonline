const mongoose = require("mongoose");

exports.databaseconnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/resumebuilderonline");
        console.log("Database Connected!");
    } catch (error) {
        console.log(error.message);
    }
};
