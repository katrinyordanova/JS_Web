const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please enter username.'],
        unique: true,
        minlength: [ 5, 'Username must be at least 5 characters long!'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9]+/.test(v)
            },
            message: 'Username must contain only of English letters and digits!'
        }
    },
    password: {
        type: String,
        require: [true, 'Please enter password'],
        minlength: [ 8, 'Password must consist of 8 characters!'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9]+/.test(v)
            },
            message: 'Password must contain only English letters and digits!'
        }
    }
});

userSchema.methods = {
    matchPassword: function(password) {
        return bcryptjs.compare(password, this.password);
    }
};

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
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