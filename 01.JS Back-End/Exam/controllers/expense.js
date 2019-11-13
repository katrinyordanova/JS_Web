const models = require('../models');
const appConfig = require('../app-config');

function getIndex(request, response) {
    response.render('./home/home.hbs');
}

function getUserHomepage(request, response) {
    models.expenseModel.find().then(expenses => {
        const username = request.cookies['username'];
        models.userModel.find({username: username}).then(user => {
            user.forEach((entity) => {
                const amount = entity.amount;
                response.render('./money/expenses.hbs', { expenses, amount });
            });
            return;
        });

    });
}


function getCreate(request, response) {
    response.render('./money/new-expense.hbs');
}

function postCreate(request, response) {
    const { merchant = null, total = null, category = null, description = null, report } = request.body;
    const creator = request.user.id;
    const isChecked = report === 'on';

    if(merchant.length < 4) {
        response.render('./user/register.hbs', { 
            errors: [
                'Password must be at least 8 characters long!'
            ]
        });
        return;
    }if(total < 0) {
        response.render('./user/register.hbs', { 
            errors: [
                'Total must be a positive number!'
            ]
        });
        return;
    }if(category === null) {
        response.render('./user/register.hbs', { 
            errors: [
                'Please choose one of the given options!'
            ]
        });
        return;
    }if(description < 10 ) {
        response.render('./user/register.hbs', { 
            errors: [
                'Description must be at least 10 characters long!'
            ]
        });
        return;
    }if(description > 50 ) {
        response.render('./user/register.hbs', { 
            errors: [
                'Description must be at no more than 50 characters long!'
            ]
        });
        return;
    }
    models.expenseModel.create({ merchant, total, category, description, report: isChecked, creator: creator})
    .then(() => {
        response.redirect('/expenses');
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

function getReport(request, response) {
    const id = request.params.id;
    //article.isAuthor = article.author.toString() === request.user_id.toString();
     //or give findOne() -> property: user._id
    models.expenseModel.findById({ _id: id }).then(expense => {
        response.render('./money/report.hbs', { expense });
    });
}

function refill(request, response) {
    const { refill = null } = request.body;
    const username = request.cookies['username'];
    //console.log(request.params.id);
    models.userModel.find({username: username}).then(user => {
        user.forEach((entity) => {
            const refilll = +refill;
            const addMoney = entity.amount + refilll;
            console.log(user);
            models.userModel.updateOne({username}, { amount: addMoney }).then(() => { response.redirect('/expenses')});
            //console.log(entity);
        });
        return;
        //console.log(user);
    })
}

function stopTracking(request, response) {
    const id = request.params.id;
    models.expenseModel.deleteOne({ _id: id }).then(() => response.redirect('/expenses'));
}

module.exports = {
    getIndex,
    getUserHomepage,
    getReport,
    getCreate,
    postCreate,
    stopTracking,
    refill
}

