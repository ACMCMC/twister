const express = require("express");
const User = require("./entities/users.js");

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
            const { password, birthdate, name, surname, email } = req.body;

            if (!password && !birthdate && !surname && !name && !email) {
                res.status(400).send("Missing fields");
            } else {
                try {
                    const user = await User.findById(req.session.current_user.username);
                    if (name) user.name = name;
                    if (surname) user.surname = surname;
                    if (birthdate) user.birthdate = new Date(birthdate);
                    if (email) user.email = email;
                    if (password) user.password = password;
                    await user.save();
                    req.session.current_user = user;
                    res.send(req.session.current_user);
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

