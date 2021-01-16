const bcrypt = require('bcryptjs');
const {contactusModel,joinusModel,usersModel} = require('./admin.model');

function createPassword(user,req,next) {
    //todo update with first 5 chars think about last name and first name  
    const { whatsappNumber } = user;
    const { name }  = user;
    const newPassword = whatsappNumber + name;
    console.log(newPassword);
    req.newPassword = newPassword;
};

const get = (req,res) => {
    res.json({
        message: 'Admin routes',
    });
};

const contactus = (req,res,next) => {
    contactusModel.find().then((result) => {
        res.json(result);
    }).catch(next);
};

const joinus = (req,res,next) => {
    const id = req.params.id;
    // console.log(id);
    const query = {};
    if(id) {
        query._id = id;
    }
    joinusModel.find(query).then((result) => {
        //todo remove the volunteers from the result before sending 
        // for(value in result) {
        //     if(!value.isVolunteer) {

        //     }
        // }
        res.json(result);
    }).catch(next);
};

const users = (req,res,next) => {
    const id = req.params.id;
    // console.log(id);
    const query = {};
    if(id) {
        query._id = id;
    }
    usersModel.find(query).then((result) => {
        res.json(result);
    }).catch(next);
};


const createUser = async (req,res,next) => {
    //todo check for teh user in userModel before creating one 
    //todo take the req body and add that value to role 
    //todo and update the isvolunteer role in joinus collection   
    const id = req.params.id;
    console.log(id);
    const query = {
        _id:id,
    };
    joinusModel.findOne(query).then(async (result) => {
        try{
            console.log('result form joinus model' , result);
            createPassword(result,req,next);
            console.log("from findOne new pass = ",req.newPassword);
            const hashed = await bcrypt.hash(req.newPassword, 12);
            const newUser = {
                email: result.email,
                password: hashed,
                role: 'volunteer',
            };
            const insertedUser = await usersModel.insert(newUser);
            res.json(insertedUser); 

        } catch(error) {
            res.status(500);
            next(error);
        }
    });
};

module.exports = {
    get,
    contactus,
    joinus,
    users,
    createUser
};