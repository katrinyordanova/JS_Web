const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const secret = 'secret';
const appConfig = require('../app-config');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
    app.set('views', path.resolve(__basedir, 'views'));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser(secret));
	app.use((request, response, next) => {
	response.locals.user = request.cookies[appConfig.authCookieName] !== undefined;
	response.locals.username = request.cookies['username'];

	next();
    });
};
