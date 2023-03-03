exports.homepage = (req, res, next) => {
    res.json({ message: "Homepage" });
};

exports.create = (req, res, next) => {
    res.json({ body: req.body });
};
