const db = require('../../../../db');

async function createUserImage(image_id, image, mimetype) {
    try{
        await db.query('BEGIN')
        const queryText = 'INSERT INTO user_image(image_id, image, mimetype) values($1, $2, $3)';
        await db.query(queryText, [image_id, image, mimetype]);
        await db.query('COMMIT');
    }catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

module.exports = {
    createUserImage
}