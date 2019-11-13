const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
    app.get('/not-found', cubeController.notFound);
    app.get('/detailsCube/:id', cubeController.details);
    app.get('/createCube', cubeController.getCreate)
        .post('/createCube', cubeController.postCreate);
    app.get('/aboutSite', cubeController.about);
    app.get('/create/accessory', accessoryController.getCreate)
        .post('/create/accessory', accessoryController.postCreate);
    app.get('/attach/accessory/:id', accessoryController.getAttach)
        .post('/attach/accessory/:id', accessoryController.postAttach);
    app.get('/', cubeController.index);
}