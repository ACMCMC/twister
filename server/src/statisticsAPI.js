const express = require("express");
const Message = require("./entities/messages.js");
const User = require("./entities/users.js");

function init() {
    const router = express.Router();

    router.route("/").get(async (req, res) => {
        try {
            const msgs = await Message.find({ author: req.session.current_user._id });
            if (!msgs)
                msgs = [];

            const statistics = {
                likes: 0,
            };
            msgs.forEach((msg) => {
                statistics.likes += msg.liked_by.length;
            });
            
            res.send(statistics);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });


    return router;
}
exports.default = init;

