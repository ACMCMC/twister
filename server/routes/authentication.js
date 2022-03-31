var express = require("express");
var User = require("../common/User");
var router = express.Router();

router.get("/login", function (req, res, next) {
    res.send({ token: "1234" });
});

router.get("/register", function (req, res, next) {
    res.send({ token: "1234" });
});

module.exports = router;