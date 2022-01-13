const userService = require('../services/user.service');


const uniqueChecking = async (req, res, next) => {
    var uniqueUsername = await userService.uniqueCheckCreate('username', req.body.username);
    var uniqueMobile = await userService.uniqueCheckCreate('mobile', req.body.mobile);
    if(uniqueUsername > 0){
        const err = new Error('Username is not unique. It already exists');
        return res.status(400).json({
            message: err.message
        })
    }else if(uniqueMobile > 0){
        const err = new Error('Mobile number is not unique. It already exists');
        return res.status(400).json({
            message: err.message
        })
    }
    next();
}

module.exports = {
    uniqueChecking
}