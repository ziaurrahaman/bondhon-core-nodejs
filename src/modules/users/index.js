const userRouter = require('./routes/user.route');


function init(app) {
    app.use('/user', userRouter);
}

module.exports = {
    init
}