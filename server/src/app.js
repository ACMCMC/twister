require('dotenv').config({ path: './config.env' });

const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
    secret: "aldan_creo_myrandomsecret"
}));

app.use('/api', api.default());

app.use(function (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
});

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;
