const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');
const { request } = require('chai');
const { resolve } = require('path');

// Configurer chai
chai.use(chaiHttp);
chai.should();

var sid;

mocha.describe("Test of the messages API", () => {

    before(function () {
        // runs before all tests in this file regardless where this line is defined.
        const request = chai.request(app.default);
        const user = {
            login: "test",
            password: "test",
        };

        return request
            .post('/api/public/login')
            .send(user).then((res) => {
                sid = res.header['set-cookie'][0].split(';')[0];
            });
    });

    // This test does not need the `done` because it is not asynchronous.
    // It will not run until the promise returned in `before` resolves.
    mocha.it('Is logged in', function () {
        const req = chai.request(app.default).get('/api/public/get_session_status');
        req.cookies = sid;
        return req.then((res) => {
            console.log(res.body);
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.contain({ logged_in: true });
        }
        ).catch((err) => {
            console.log(err);
        });
    })

    mocha.it("Post message", (done) => {
        const request = chai.request(app.default).post('/api/message');
        const body = {
            text: "ABCDEF"
        };

        request.cookies = sid;
        request.send(body)
            .then((res) => {
                res.should.have.status(201);
                done();
            }).catch((err) => done(err)).finally(() => chai.request().close());
    })
})

