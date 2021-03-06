const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Get session status test", () => {
    mocha.it("should return false when the user is not authenticated", (done) => {
        const request = chai.request(app.default);

        request
            .get('/api/public/get_session_status')
            .then((res) => {
                res.should.have.status(200);
                res.body.should.contain({logged_in: false});
            })
            .then(() => done())
            .catch((err) => done(err))
    });
})

