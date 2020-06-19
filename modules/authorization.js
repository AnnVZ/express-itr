var session = require('express-session');
const { findUser } = require('./users');

exports.check = function (req) {
    return req.session.authorized;
}

exports.set = function (req, authorized, id = '') {
    req.session.authorized = authorized;
    req.session.userid = id;
}