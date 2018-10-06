const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const {User} = require('../models/user');

describe('new User', () => {
    it('new User should fail when not passed a username', done => {
        const user = new User({password: 'pizzapie22', email: 'example@gmail.com', name: 'emily ghouri'});
        user.validate(err => {
            expect(err).to.exist;
            done();
        })
    });
})