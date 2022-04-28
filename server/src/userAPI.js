const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("./entities/users.js");
const { publicAPI } = require("./publicAPI.js");

function init() {
    const router = express.Router();

    router.post("/logout", async (req, res) => {
        try {
            // Destruction of the session
            req.session.destroy((err) => { });
            res.json({
                message: "Logged out successfully."
            });
            return;
        }
        catch (e) {
            // Any other error
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Unknown error").toString()
            });
        }
    });

    router
        .route("/")
        .get(async (req, res) => {
            try {
                const user = await User.findOne({ username: req.query.username }).exec();
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    return router;
}
exports.default = init;

