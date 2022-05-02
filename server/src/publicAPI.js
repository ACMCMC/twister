
const express = require("express");
const User = require("./entities/users.js");

function init() {
    const router = express.Router();
    router.post("/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Invalid request: missing fields"
                });
                return;
            }
            const user = await User.findById(login);
            if (!user) {
                res.status(401).json({
                    status: 401,
                    message: "Unknown user"
                });
                return;
            }
            user.checkPassword(password, (error, isMatch) => {
                if (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Internal error"
                    });
                    return;
                }
                if (!isMatch) {
                    // Incorrect login
                    req.session.destroy((err) => { });
                    res.status(403).json({
                        status: 403,
                        message: "Wrong username/password"
                    });
                } else {
                    // Correct login
                    req.session.regenerate(function (err) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "Internal server error"
                            });
                        }
                        else {
                            // C'est bon, nouvelle session créée
                            req.session.current_user = user
                            res.status(200).json({
                                status: 200,
                                message: "Login accepted"
                            });
                        }
                    });
                }
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "Internal error",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router.get("/get_session_status", async (req, res) => {
        try {
            if (req.session.current_user) {
                res.send({logged_in: true, user: req.session.current_user});
            } else {
                res.send({logged_in: false});
            }
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

    router.post("/register", (req, res) => {
        console.log(req.body);
        const { username, password, birthdate, name, surname, email } = req.body;

        if (!username || !password || !surname || !name || !email || !birthdate) {
            res.status(400).send("Missing fields");
        } else {
        const newUser = new User({ name: name, surname: surname, email: email, _id: username, password: password, birthdate: new Date(birthdate) });
        newUser.save()
        .then(() => res.status(201).send(newUser))
        .catch((err) => res.status(500).send(err));
        }
    });

    return router;
}
exports.default = init;

