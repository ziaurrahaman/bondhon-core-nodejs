const { body, check } = require('express-validator');

const createUserSchema = [
    body('username')
        .notEmpty().withMessage("Username field is empty")
        .isLength({min: 3, max: 20}).withMessage("Username length must be between 3 to 20 character ")
    ,
    body('mobile')
        .notEmpty().withMessage("Mobile number field is empty")
        .matches(/^\+(?:[0-9]●?){6,14}[0-9]$/).withMessage("Invalid Mobile No. Please follow the internatinal format.")    
    ,
    body('name')
        .notEmpty().withMessage("Name field is empty")
    ,
    body('gender')
        .notEmpty().withMessage("Gender field is empty")
    ,
    body('role')
        .notEmpty().withMessage("Role field is empty")
    ,
    body('password')
        .notEmpty().withMessage("Password field is empty")
        .isLength({min: 8}).withMessage("Minimum password length is 8")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).withMessage("Invalid password, it must contain Capital Letter, Small Letter, Number and Special Character")
    ,
    body('image')
        .notEmpty().withMessage("No image")
    ,
    body('mimetype')
        .notEmpty().withMessage("No image type")
        
]

const updateUserSchema = [
    body('username')
        .notEmpty().withMessage("Username field is empty")
        .isLength({min: 3, max: 20}).withMessage("Username length must be between 3 to 20 character ")
    ,
    body('mobile')
        .notEmpty().withMessage("Mobile number field is empty")
        .matches(/^\+(?:[0-9]●?){6,14}[0-9]$/).withMessage("Invalid Mobile No. Please follow the internatinal format.")    
    ,
    body('name')
        .notEmpty().withMessage("Name field is empty")
        .isLength({min: 3, max: 20}).withMessage("name length must be between 3 to 20 character ")
    ,
    body('role')
        .notEmpty().withMessage("Role field is empty")
        .isLength({min: 1, max: 5}).withMessage("role length must be between 1 to 5 character ")
    ,
    body('password')
        .notEmpty().withMessage("Password field is empty")
        .isLength({min: 8}).withMessage("Minimum password length is 8")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).withMessage("Invalid password, it must contain Capital Letter, Small Letter, Number and Special Character")
    ,

    body('userImage.image')
        .notEmpty().withMessage("Base64 encoded image string")
    ,
    body('userImage.mimetype')
        .notEmpty().withMessage("No image type")
        .isLength({min: 3, max: 10}).withMessage("mimetype length must be between 3 to 10 character ")
        
]

module.exports = {
    createUserSchema,
    updateUserSchema
}