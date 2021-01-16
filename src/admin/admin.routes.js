const express = require('express');

const controller = require('./admin.controller');

const router = express.Router();

router.get('/',controller.get);
router.get('/contactus',controller.contactus);
router.get('/joinus',controller.joinus);
router.get('/joinus/:id',controller.joinus);
router.get('/users',controller.users);
router.get('/users/:id',controller.users);

router.put('/createuser/:id',controller.createUser);

module.exports = router;