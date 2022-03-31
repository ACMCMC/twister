var express = require("express");
var User = require("../common/User");
var router = express.Router();

var userList = [];

router.get("/login", function (req, res, next) {
    if (req.query.login === 'trial' && req.query.password === 'trial') {
        res.send({ token: "1234" });
    }
    res.status(401)
    res.send()
});

router.get("/sign_up", function (req, res, next) {
    newUser = new User(req.query.name, req.query.username, '', req.query.login)
    res.send({ token: "1234" });
    userList = userList.push(newUser);
});

module.exports = router;