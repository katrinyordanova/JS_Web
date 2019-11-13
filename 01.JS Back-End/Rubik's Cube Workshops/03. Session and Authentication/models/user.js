const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
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
})
module.exports = mongoose.model('User', userSchema);