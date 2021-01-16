const express = require('express');
const Joi = require('joi');

const db = require('./../db/connection');

const joinus = db.get('joinus');

const schema = Joi.object({
    name:Joi.string().trim().min(6).max(40).required(),
    email:Joi.string().regex(/\S+@\S+\.\S+/).required(),
    whatsappNumber:Joi.string().trim().min(10).max(10).required(),
    alternatePhoneNumber:Joi.string().trim().min(10).max(10),
    qualifications: Joi.string().required(),
    reason:Joi.string().trim().min(5).required(),//todo min length 40 
});

const router = express.Router();

// router.get('/', (req,res,next) => {
//     joinus.find().then((result) => {
//         res.json(result);
//     }).catch(next);
// });
router.post('/' ,(req,res,next) => {
    console.log('req.body = ' , req.body);

    const data = {
        ...req.body,
    };
    const result = schema.validate(data);
    console.log(result);
    if(!result.error) {
        data.isVolunteer = false;
        joinus.insert(data).then((result)=> {
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