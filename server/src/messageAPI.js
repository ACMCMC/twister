const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Message = require("./entities/messages.js");

function init() {
    const router = express.Router();

    router
        .route("/")
        .get(async (req, res) => {
            try {
                const msg = await Message.findOne({ _id: req.query._id }).exec();
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
                const msg = new Message({ text: req.body.text, author: req.session.current_user._id });
                await msg.save();
                res.status(200).send(msg);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        .delete((req, res, next) => {
            try {
                Message.findByIdAndDelete(req.query.id).then((resp) => {
                    if (resp) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(404);
                    }
                }).catch((error) => {
                    res.status(500).send(error);
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

