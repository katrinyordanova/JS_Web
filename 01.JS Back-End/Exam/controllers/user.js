const models = require('../models');
const appConfig = require('../app-config');
const utilities = require('../utilities');

function getRegister(request, response) {
	response.render('./user/register.hbs');
}

function postRegister(request, response) {
	const { username = null, password = null, repeatPassword = null, amount = null } = request.body;
	if (password !== repeatPassword) {
		response.render('./user/register.hbs', { 
            errors: [
                'Both passwords should match!'
            ]
        });
		return;
	}
	if(amount < 0) {
		response.render('./user/register.hbs', { 
            errors: [
                'Amount should be a positive number!'
            ]
        });
		return;
	}
	if(username.length < 5) {
		response.render('./user/register.hbs', { 
            errors: [
                'Username must be at least 4 characters long and composed of english letters and numbers!'
            ]
        });
		return;
	}
	if(password.length < 8) {
		response.render('./user/register.hbs', { 
            errors: [
                'Password must be at least 8 characters long!'
            ]
        });
		return;
	}
	// if(username.contains() < 5) {
	// 	response.render('./user/register.hbs', { 
    //         errors: [
    //             'Username must be at least 4  characters long!'
    //         ]
    //     });
	// 	return;
	// }
	models.userModel.create({ username, password, amount }).then(() => {
		response.redirect('/login');
	}).catch(error => {
		if(error.name === 'MongoError') {
            response.render('./user/register.hbs', { 
                errors: [
                    'Username is already taken!'
                ]
			});
			return;
        } if(error === 'ValidationError') {
			response.render('./user/register.hbs', {
				errors: error.errors
			});
			return;
		}
	});
}

function getLogin(request, response) {
	response.render('./user/login.hbs');
}

function postLogin(request, response) {
	const { username = null, password = null } = request.body;
	models.userModel.findOne({ username }).then(user => 
	Promise.all([user, user ? user.matchPassword(password) : false]))
	.then(([user, match]) => {
		if(!match) {
			response.render('./user/login.hbs', { 
            errors: [
                'Username or password is incorrect.'
            ]
        });
		return;
		}
		const token = utilities.jwt.createToken({ id: user._id });
		response.cookie(appConfig.authCookieName, token)
		.cookie('username', username)
		.redirect('/expenses');
	}).catch(error => {
		if(error.name === 'MongoError') {
            response.render('./user/register.hbs', { 
                errors: [
                    'Username is already taken!'
                ]
			});
			return;
        } else if(error === 'ValidationError') {
			response.render('./user/login.hbs', {
				errors: error.errors
			});
			return;
		}
	});
}

function logout(request, response) {
	response.clearCookie(appConfig.authCookieName)
	.clearCookie('username')
	.redirect('/');
}

module.exports = {
	getRegister,
	postRegister,
	getLogin,
	postLogin,
	logout
}