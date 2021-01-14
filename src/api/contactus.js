const express = require('express');
const Joi = require('joi');

const db = require('./../db/connection');

const contactus = db.get('contactus');

const schema = Joi.object({
    name:Joi.string().trim().min(6).max(40).required(),
    email:Joi.string().regex(/\S+@\S+\.\S+/).required(),
    phoneNumber:Joi.string().trim().min(10).max(10).required(),
    purpose:Joi.string(),
    message:Joi.string().trim().min(5).required(), //todo change minumum to 40 
});

const router = express.Router();

router.get('/', (req,res,next) => {
    contactus.find().then((result) => {
        res.json(result);
    }).catch(next);
});
router.post('/' ,(req,res,next) => {
    console.log('req.body = ' , req.body);

    const data = {
        ...req.body,
    };
    const result = schema.validate(data);
    console.log(result);
    if(!result.error) {
        contactus.insert(data).then((result)=> {
            res.json(result);
        });
    }
    else {
        const err = new Error(result.error);
        res.status(422);
        next(err);
    }
});

module.exports = router;