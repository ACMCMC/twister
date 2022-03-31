var express = require("express");
var router = express.Router();

router.get("/isConnected", function (req, res, next) {
    res.send({ isConnected: true });
});

router.use("/users", require("./users"));
router.use("/authentication", require("./authentication"));

module.exports = router;