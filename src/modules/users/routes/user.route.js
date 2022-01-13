const express = require('express');
const fs = require('fs');
const path = require('path');
const fsAsync = fs.promises;
const userService = require('../services/user.service');
const userImageService = require('../services/user.image.service');
const userValidators = require('../validators/user.validator');
const { validationResult, body } = require('express-validator');
const { validates } = require('../middlewares/validation.middle');
const { uniqueChecking } = require('../middlewares/uniqueCheck.middle');
//const { singleUpload } = require('../../../middlewares/file-upload.middle');
const bcrypt = require("bcryptjs");

const router = express.Router();

/*
* Author Adnan
* Create User API
*/
router.post('/', [...userValidators.createUserSchema, validates, uniqueChecking],
    async(req, res) => {
        //console.log("Create User API")
        const { username, mobile, name, gender, role, password, image, mimetype } = req.body;
        //const buff = await fsAsync.readFile(path.resolve(req.file.path));
        //console.log(await userService.uniqueCheckCreate('username', username));
        const salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(password, salt);
        const newUserId = await userService.createUser(username, mobile, name, gender, role, hashPassword);
        await userImageService.createUserImage(newUserId, image, mimetype);
        return res.status(201).json({
            id: newUserId,
            message: "User Created"
        })
    }
);

/*
* Author Azmi
* Get User Using ID
*/
router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const findid = await userService.findId(id);
    if (findid.length === 0) {
        return res.status(405).json({
            message: "ID is not avaiable in database"
        })
    } else {
        const users = await userService.getUserwithimage(id);
        //console.log('get the users with images ');
        return res.status(200).json({
            message: "Request Successful",
            usersdata: users[0],
            image: users[1]
        })
    }
});

/*
* Auhtor Rafsan
* Update User
*/
router.put('/',
    [...userValidators.updateUserSchema, validates],
    async (req, res) => {
        const { username, mobile,name,role,password, userImage:{image,mimetype} } = req.body;
        const updateUser = await userService.updateUser(username,mobile,name,role,password,image,mimetype);
        return res.status(200).json({
            message:"User Updated Successfully",
            id: updateUser
        })
    }
);



/*
* Auhtor Nazmul
* Get User With Pagination
*/
router.get('/', async(req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.limit);
    // console.log(size);
    // console.log

    if (page === 0 || size === 0) {
        return res.status(200).json({
            message: "Invalid Page or Limit number"
        })
    } else {
        const count = await userService.countUsers();
        const total_page = Math.ceil(count / size);
        //console.log(total_page);
        const user = await userService.getUserPagination(page, size);
        const previous = await userService.priviousPage(page, total_page);
        const next = await userService.nextPage(page, total_page);
        //console.log(next);

        return res.status(200).json({
            message: "run suncessfully",
            total_page: total_page,
            current_page: page,
            limit: size,
            next_page: next,
            previous_page: previous,
            data: user
        })
    }

})


/*
* Author Nazmul
* Delete User
*/
router.delete('/:id',
    async(req, res) => {
        //console.log("Delete User API");
        const id = req.params.id;
        const users = await userService.findId(id);
        if (users.length === 0) {
            const err = new Error('User not found');
            return res.status(400).json({
                message: err.message
            })
        } else {
            await userService.deletUser(id);
            return res.status(201).json({
                message: "User Deleted Successfully",
                id: id                
            })
        }

    }
);



module.exports = router;