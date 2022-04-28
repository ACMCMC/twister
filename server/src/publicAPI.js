
const express = require("express");
const { default: mongoose } = require("mongoose");
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
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            const user = await User.findOne({ username: login }).exec();
            if (!user) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            user.checkPassword(password, (error, isMatch) => {
                if (error) {
                    res.status(500).json({
                        status: 500,
                        message: "Erreur interne"
                    });
                    return;
                }
                if (!isMatch) {
                    // Incorrect login
                    req.session.destroy((err) => { });
                    res.status(403).json({
                        status: 403,
                        message: "Login et/ou mot de passe invalide(s)"
                    });
                } else {
                    // Correct login
                    req.session.regenerate(function (err) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "Erreur interne"
                            });
                        }
                        else {
                            // C'est bon, nouvelle session créée
                            req.session.current_user = user;
                            res.status(200).json({
                                status: 200,
                                message: "Login et mot de passe accepté"
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
                message: "erreur interne",
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
        const { username, password, birthdate, name, surname, email } = req.body;

        if (!username || !password || !surname || !name || !email) {
            res.status(400).send("Missing fields");
        } else {
        const newUser = new User({ name: name, surname: surname, email: email, username: username, password: password });
        newUser.save()
        .then(() => res.status(201).send({ id: username }))
        .catch((err) => res.status(500).send(err));
        }
    });

    return router;
}
exports.default = init;

