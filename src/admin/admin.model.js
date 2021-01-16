const db = require('./../db/connection');

const contactusModel = db.get('contactus');
const joinusModel = db.get('joinus');
const usersModel = db.get('users');

module.exports = {
    contactusModel,
    joinusModel,
    usersModel
}