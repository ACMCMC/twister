const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("./entities/users.js");
const publicAPI = require("./publicAPI.js");
const userAPI = require("./userAPI.js");
const messageAPI = require("./messageAPI.js");
const statisticsAPI = require("./statisticsAPI.js");

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
    router.use('/public', publicAPI.default());
    // Enforce authentication
    router.use((req, res, next) => {
        if (req.session.current_user) {
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    });
    router.use('/user', userAPI.default());
    router.use('/message', messageAPI.default());
    router.use('/statistics', statisticsAPI.default());

    return router;
}
exports.default = init;

