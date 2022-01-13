const db = require('../../../../db');
const { hashPassword } = require('../utils/bcrypt.utils');

async function uniqueCheckCreate(colName, value) {
    try {
        await db.query('BEGIN');
        const queryText = 'select count(username) as flag from users where ' + colName + ' = $1';
        console.log(queryText);
        const result = await db.query(queryText, [value]);
        await db.query('COMMIT');
        return result.rows[0].flag;
    } catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

async function createUser(username, mobile, name, gender, role, password) {
    try {
        await db.query('BEGIN')
        const queryText = 'INSERT INTO users (username, mobile, name, gender, role, password) values($1, $2, $3, $4, $5, $6) RETURNING id';
        const result = await db.query(queryText, [username, mobile, name, gender, role, password]);
        await db.query('COMMIT');
        return result.rows[0].id;
    } catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

async function getUserwithimage(id) {
    const users = await db.query('SELECT  username, mobile, name, gender, role FROM users WHERE id=$1', [id]);
    const image = await db.query("SELECT image FROM user_image WHERE image_id= $1", [id]);
    const data = [users.rows, image.rows];
    return data;

}


async function updateUser(username, mobile,name,role,pass,image,mimetype) {
    const password = await hashPassword(pass);    
    try {   
        await db.query('BEGIN')

        const userUpdate ="UPDATE users SET username=$1, mobile=$2, name=$3, role=$4, password=$5 WHERE username=$1  RETURNING id";
       
        const updatedUser = await db.query(userUpdate, [username, mobile,name,role,password]);
        console.log(userUpdate)
        const imageUpdate = "UPDATE user_image I SET image=$1, mimetype=$2 from users U WHERE I.image_id = U.id";
                            await db.query(imageUpdate,[image,mimetype] );
                            console.log(imageUpdate)
                            await db.query('COMMIT')
        return updatedUser.rows[0].id;    
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    } 
    
  }

// async function findid(id) {
//     var rev = 0;
//     const allid = await db.query('SELECT id FROM users');
//     let length = allid.rows.length
//     for (let i = 0; i < length; i++) {
//         if (allid.rows[i].id === id) {
//             rev = 1;
//             break;
//         }
//     }
//     return rev;
// }



async function getUserPagination(page, limit) {
    const users = await db.query("SELECT id,username, mobile, name, gender, role FROM users LIMIT $2 OFFSET (($1 - 1) * $2)", [page, limit]);
    return users.rows;
}

// async function getUserwithimage(id) {
//     const users = await db.query('SELECT * FROM users WHERE id=$1', [id]);
//     return users.rows;

// }

async function countUsers() {
    try {
        await db.query('BEGIN');
        const queryText = 'select count(username) as total from users';
        const result = await db.query(queryText);
        await db.query('COMMIT');
        return result.rows[0].total;
    } catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }


}

async function priviousPage(page, total_page) {
    let previous = 0;
    let message = '';


    if (page > 1 && page <= total_page) {
        previous = page - 1;
        message = 'Page Found';
    } else if (page > total_page) {
        previous = 0;
        message = 'Page Found';
    } else if (page <= 1) {
        previous = 0;
        message = 'You are in the first page';
    }

    return { previous, message };
}

async function nextPage(page, total_page) {
    let next = 0;
    let message = '';

    if (page >= 1 && page < total_page) {
        next = page + 1;
        message = 'found';
    } else if (page >= total_page) {
        next = 0
        message = 'You in the Last Page';
    } else if (page <= 1) {
        next = ' page is not found';
    }

    return { next, message };
}

async function findId(id) {
    const result = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return result.rows;

}

async function deletUser(id) {
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
    })
}


module.exports = {
    createUser,
    uniqueCheckCreate,
    getUserwithimage,
    updateUser,
    findId,
    deletUser,
    nextPage,
    priviousPage,
    getUserPagination,
    countUsers
}