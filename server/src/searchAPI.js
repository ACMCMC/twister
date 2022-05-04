const express = require("express");
const Message = require("./entities/messages.js");
const User = require("./entities/users.js");

function init() {
    const router = express.Router();

    router
        .route("/")
        .get(async (req, res) => {
            const { username, justMyContacts } = req.query;
            if (!username) {
                res.status(400).send("Missing username");
                return;
            }
            try {
                var user = null;
                if (justMyContacts === 'true') {
                    const currentUser = await User.findById(req.session.current_user._id);
                    if (!currentUser) {
                        res.sendStatus(404);
                        return;
                    }
                    else {
                        user = await User.find({ username: { $regex: username, $options: "i" }, _id: { $in: currentUser.following } }).exec();
                    }
                } else {
                    user = await User.find({ username: { $regex: username, $options: "i" } }).exec();
                }
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                console.error(e);
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;

