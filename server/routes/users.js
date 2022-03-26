var express = require("express");
const { User } = require("../common/User");
var router = express.Router();

router.get("/list", function (req, res, next) {
    const userList = [];
    userList.push(new User("Aileen", "aileen", new Date(), "aileen@gmail.com"));
    userList.push(new User("Beatrice", "bea", new Date(), "bea@yahoo.com"));
    userList.push(new User("Charles", "charlie", new Date(), "cl@hotmail.com"));
    userList.push(new User("Daniel", "danny", new Date(), "danny@mail.com"));
    res.send({ users: userList });
});

module.exports = router;