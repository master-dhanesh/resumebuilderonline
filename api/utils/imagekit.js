const ImageKit = require("imagekit");

exports.intiImagekit = function () {
    var imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_ID,
        privateKey: process.env.IMAGEKIT_PRIVATE_ID,
        urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
    });
    return imagekit;
};
