const bcrypt = require('bcryptjs');

async function hashPassword(password){
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

module.exports = {
    hashPassword
}