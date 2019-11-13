const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
    app.set(path.resolve(__basedir, 'views'));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.use(bodyParser.urlencoded({ extended: false}));
};
