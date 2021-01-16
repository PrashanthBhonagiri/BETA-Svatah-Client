const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');

const router = express.Router();

const defaultLoginError = 'Unable to login';
const signInError = 'Email already taken';

router.get('/',controller.get);

router.post(
    '/signup',
    middlewares.validateUser(),
    middlewares.findUser(signInError, (user) => user,409),
    controller.signup,
);
router.post(
    '/login',
    middlewares.validateUser(defaultLoginError),
    middlewares.findUser(defaultLoginError, (user) => !(user)),
    controller.login,
);

module.exports = router;