const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Message = require("./entities/messages.js");
const User = require("./entities/users.js");

function transform_msg(msg) {
    return (User.findById(msg.author).exec().then((author) =>
        User.find({ _id: { $in: msg.liked_by } }).exec().then((likers) => {
            return ({
                author: author.username,
                text: msg.text,
                created: msg.created,
                liked_by: likers.map(l => l.username),
                parent: msg.parent,
                _id: msg._id,
            });
        })
    ));
}

function init() {
    const router = express.Router();

    router
        .route("/")
        .get(async (req, res) => {
            try {
                const msg = await Message.findById(req.query._id).exec();
                if (!msg)
                    res.sendStatus(404);
                else {
                    const transformed = await transform_msg(msg);
                    res.send(transformed);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).send(e);
            }
        })
        .post(async (req, res) => {
            try {
                const msg = new Message({ text: req.body.text, author: req.session.current_user._id });
                await msg.save();
                const transformed = await transform_msg(msg);
                res.status(201).send(transformed);
            }
            catch (e) {
                console.error(e);
                res.status(500).send(e);
            }
        })
        .delete((req, res, next) => {
            try {
                Message.findByIdAndDelete(req.query._id).then((resp) => {
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
                console.error(e);
                res.status(500).send(e);
            }
        });

    router.route("/all").get(async (req, res) => {
        try {
            const msgs = await Message.find({}).exec();
            if (!msgs)
                res.sendStatus(404);
            else {
                const transformPromises = msgs.map(msg => transform_msg(msg));
                const transformed = await Promise.all(transformPromises);
                res.send(transformed);
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    });

    router.route("/like").put(async (req, res) => {
        try {
            const msg = await Message.findById(req.body._id).exec();
            if (!msg)
                res.sendStatus(404);
            else {
                msg.liked_by.push(req.session.current_user._id);
                await msg.save();
                const transformed = await transform_msg(msg);
                res.status(201).send(transformed);
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    })
        .delete(async (req, res) => {
            try {
                const msg = await Message.findById(req.query._id).exec();
                if (!msg)
                    res.sendStatus(404);
                else {
                    const index = msg.liked_by.indexOf(req.session.current_user._id);
                    if (index > -1) {
                        msg.liked_by.splice(index, 1);
                        await msg.save();
                        const transformed = await transform_msg(msg);
                        res.status(200).send(transformed);
                    } else {
                        res.sendStatus(404);
                    }
                }
            } catch (e) {
                console.error(e);
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;

