const cubeController = require('../controllers/cube');

module.exports = (app) => {
    app.get('/not-found', cubeController.notFound);
    app.get('/details/:id', cubeController.details);
    app.get('/create', cubeController.getCreate)
        .post('/create', cubeController.postCreate);
    app.get('/about', cubeController.about);
    app.get('/', cubeController.index);
}