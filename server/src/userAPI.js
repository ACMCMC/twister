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
        .put(async (req, res) => {
        const { username, password, birthdate, name, surname, email } = req.body;

        if (!username || !password || !surname || !name || !email) {
            res.status(400).send("Missing fields");
        } else {
            try {
                var user = req.session.current_user; // We are authenticated, so we're sure that the user exists
                    user.name = name;
                    user.surname = surname;
                    user.birthdate = birthdate;
                    user.email = email;
                    user.password = password;
                    user.save();
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        }
        })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    return router;
}
exports.default = init;

