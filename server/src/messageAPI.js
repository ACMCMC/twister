const express = require("express");
const { default: mongoose } = require("mongoose");
const Message = require("./entities/messages.js");

function init() {
    const router = express.Router();

    router
        .route("/")
        .get(async (req, res) => {
            try {
                const msg = await Message.findOne({ id: req.query.id }).exec();
                if (!msg)
                    res.sendStatus(404);
                else
                    res.send(msg);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .post(async (req, res) => {
            try {
                const msg = new Message({text: req.body.text, author: req.session.current_user.id});
                await msg.save();
                res.status(200).send(msg);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .delete((req, res, next) => {
            try {
                Message.deleteOne({ id: req.query.id }).exec().then((resp) => {
                    if (resp.deletedCount === 0)
                        res.sendStatus(404);
                    else
                        res.sendStatus(200);
                }).catch(() => {
                    res.sendStatus(500);
                });
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

        router.route("/all").get(async (req, res) => {
            try {
                const msgs = await Message.find({}).exec();
                if (!msgs)
                    res.sendStatus(404);
                else
                    res.send(msgs);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;

