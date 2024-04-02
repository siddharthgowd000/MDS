const session = require('express-session');
const crypto = require('crypto');
const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};
const sessionconfig = {
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: false
}
module.exports={sessionconfig}