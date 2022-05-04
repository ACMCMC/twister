const express = require("express");
const Message = require("./entities/messages.js");
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
                    const user = await User.findById(req.session.current_user._id);
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
        .delete((req, res, next) => {
            console.log(req.session.current_user);
            User.findByIdAndDelete(req.session.current_user._id)
                .then(() => {
                    Message.deleteMany({ author: req.session.current_user._id }).then(() => {
                        req.session.destroy();
                        res.sendStatus(200);
                    });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        router
        .route("/followers").get(async (req, res) => {
            try {
                const user = await User.findOne({ username: req.query.username} );
                if (!user)
                    res.sendStatus(404);
                else
                {
                    const followers = await User.find({ following: { $in: user._id} });
                    const followers_usernames = followers.map(f => f.username);
                    res.send(followers_usernames);
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

        router.route("/follow").put(async (req, res) => {
            try {
                const user = await User.findOne({ username: req.body.username });
                if (!user) {
                    res.sendStatus(404);
                }
                else
                {
                    const current_user = await User.findById(req.session.current_user._id);
                    if (!current_user) {
                        res.sendStatus(404);
                    }
                    else
                    {
                        if (current_user.following.indexOf(user._id) === -1)
                        {
                            current_user.following.push(user._id);
                            await current_user.save();
                            req.session.current_user = current_user;
                            res.sendStatus(200);
                        }
                        else
                        {
                            res.sendStatus(400);
                        }
                    }
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

        router.route("/unfollow").put(async (req, res) => {
            try {
                const user = await User.findOne({ username: req.body.username });
                if (!user)
                    res.sendStatus(404);
                else
                {
                    const current_user = await User.findById(req.session.current_user._id);
                    if (!current_user)
                        res.sendStatus(404);
                    else
                    {
                        if (current_user.following.indexOf(user._id) !== -1)
                        {
                            current_user.following.splice(user.following.indexOf(user._id), 1);
                            await current_user.save();
                            req.session.current_user = current_user;
                            res.sendStatus(200);
                        }
                        else
                        {
                            res.sendStatus(400);
                        }
                    }
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

        router.route("/following").get(async (req, res) => {
            try {
                const user = await User.findOne({username: req.query.username});
                if (!user)
                    res.sendStatus(404);
                else {
                    const followingUsers = await User.find({ _id: { $in: user.following}}).exec();
                    const followingUsersUsernames = followingUsers.map((u) => u.username);
                    res.send(followingUsersUsernames);
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;

