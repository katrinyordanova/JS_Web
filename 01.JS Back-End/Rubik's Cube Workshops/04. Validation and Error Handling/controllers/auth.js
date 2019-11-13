const models = require('../models');
const appConfig = require('../app-config');
const utilities = require('../utilities');

function getRegister(request, response) {
    response.render('./user/register.hbs');
}

function postRegister(request, response, next) {
    const { username, password, repeatPassword } = request.body;
    if (password !== repeatPassword) {
        response.render('./user/register.hbs', { 
            errors: {
                repeatPassword: 'Passwords don\'t match'
            }

        });
        return;
    }
    models.userModel.create({ username, password }).then(() => {
        response.redirect('/login');
    }).catch(error => {
        if(error.name === 'ValidationError') {
            response.render('./user/register.hbs', {
                errors: error.errors
            });
            return;
        }
        next(error);
    });
}

function getLogin(request, response) {
    response.render('./user/login.hbs');
}

function postLogin(request, response) {
    const { username, password } = request.body;
    models.userModel.findOne({ username })
    .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
    .then(([ user, match ]) => {
        if(!match) {
            response.render('./user/login.hbs', {
                errors: {
                    username: 'Incorrect username or password. Please try again.'
                }
            });
            return;
        }
        const token = utilities.jwt.createToken({ id: user._id });
        response.cookie(appConfig.authCookieName, token).redirect('/');
    }).catch(error => {
        if(error.name === 'ValidationError') {
            response.render('./accessory/createAccessory.hbs', {
              errors: error.errors
            });
        }
    });
}

function logout(request, response) {
    const token = request.cookies[appConfig.authCookieName];
    models.tokenBlacklist.create({ token })
    .then(() => {
        response.clearCookie(appConfig.authCookieName)
        .redirect('/');
    });
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}