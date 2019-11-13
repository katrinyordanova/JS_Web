const controllers = require('../controllers');
const { auth } = require('../utilities');

module.exports = (app) => {
    //user
    app.get('/register', controllers.userController.getRegister)
        .post('/register', controllers.userController.postRegister);
    app.get('/login', controllers.userController.getLogin)
        .post('/login', controllers.userController.postLogin);
    app.get('/logout', controllers.userController.logout);
    //cube
    app.get('/create/cube', auth(), controllers.cubeController.getCreate)
        .post('/create/cube', auth(), controllers.cubeController.postCreate); 
    app.get('/details/cube/:id', controllers.cubeController.details);
    app.get('/edit/cube/:id', auth(),controllers.cubeController.getEdit)
        .post('/edit/cube/:id', auth(), controllers.cubeController.postEdit);
    app.get('/delete/cube/:id', auth(), controllers.cubeController.getDelete)
        .post('/delete/cube/:id', auth(), controllers.cubeController.postDelete);
    //accessory
    app.get('/create/accessory', auth(), controllers.accessoryController.getCreate)
        .post('/create/accessory', auth(), controllers.accessoryController.postCreate);
    app.get('/attach/accessory/:id', auth(), controllers.accessoryController.getAttach)
        .post('/attach/accessory/:id', auth(), controllers.accessoryController.postAttach);
    //error
    app.get('/not-found', controllers.cubeController.notFound);
    //site
    app.get('/about/site', controllers.cubeController.about);
    app.get('/', controllers.cubeController.index);
    app.get('*', (request, response) => { response.render('./error/404.hbs');});
}