const controllers = require('../controllers');
const { auth } = require('../utilities');

module.exports = (app) => {
	//expense
	app.get('/expenses', auth(), controllers.expenseController.getUserHomepage);
	app.get('/create', auth(), controllers.expenseController.getCreate)
        .post('/create', auth(), controllers.expenseController.postCreate);
	app.get('/report/:id', auth(), controllers.expenseController.getReport);
	app.get('/delete/:id', auth(), controllers.expenseController.stopTracking)
	app.post('/refill', auth(), controllers.expenseController.refill);
    // app.get('//edit/:id', auth(), controllers.courseController.getEdit)
    //     .post('//edit/:id', auth(), controllers.courseController.postEdit);
	
	// 	.post('//delete/:id', auth(), controllers.courseController.postDelete)
	//user
	app.get('/register', controllers.userController.getRegister)
		.post('/register', controllers.userController.postRegister);
	app.get('/login', controllers.userController.getLogin)
		.post('/login', controllers.userController.postLogin);
	app.get('/logout', controllers.userController.logout);
	//home
	app.get('/', controllers.expenseController.getIndex);
	app.get('*', (request, response) => { response.render('./error/404.hbs')});
}