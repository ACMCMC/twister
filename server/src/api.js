const express = require("express");
const User = require("./entities/users.js");

function init() {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    router.post("/user/login", async (req, res) => {


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
                        message: "login et/ou le mot de passe invalide(s)"
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
                            req.session.userid = user.username;
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

    router.get("/user/get_session_status", async (req, res) => {


        try {
            if (req.session.id) {
                res.send(true);
            } else {
                res.send(false);
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

    router.post("/user/logout", async (req, res) => {
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
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.user_id);
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

    router.post("/user/register", (req, res) => {
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

