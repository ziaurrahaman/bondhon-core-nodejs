const { validationResult } = require('express-validator');
const RequestValidationError = require('../../../errors/validation.error');


const validates = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    next();
}

module.exports = {
    validates
}