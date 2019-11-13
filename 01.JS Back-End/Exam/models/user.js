const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [ true, 'Username is required!'],
		unique: [ true, 'Username is already taken!'],
		minlength: [ 4, 'Username must be at least 4  characters long!'],
		validate: {
            validator: function(v) {
                return /[A-Za-z0-9]+/.test(v)
            }, 
            message: 'Description must consist of only English letters and digits.'
        }
	},
	password: {
		type: String,
		required: [ true, 'Password is required!'],
		minlength: 8
	},
	amount: {
		type: Number,
		required: [ true, 'Please insert amount!'],
		default: 0
	},
	expenses: [ { type: mongoose.Types.ObjectId, ref: 'Expenses' }]
});

userSchema.methods = {
	matchPassword: function(password) {
		return bcryptjs.compare(password, this.password);
	}
}

userSchema.pre('save', function (next) {
	if(this.isModified('password')) {
		bcryptjs.genSalt(saltRounds, (error, salt) => {
            if(error) { next(error); return;}
            bcryptjs.hash(this.password, salt, (error, hash) => {
            if(error) { next(error); return;}
                this.password = hash;
                next();                
            });
        });
        return;
	}
	next();
});

module.exports = mongoose.model('User', userSchema);