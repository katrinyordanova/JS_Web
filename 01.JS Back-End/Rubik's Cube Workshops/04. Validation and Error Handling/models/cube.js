const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [ true, 'Please enter a cube name.'],
        minlength: [ 5, 'Cube name must be at least 5 characters long.'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9\s]+/.test(v)
            }, 
            message: 'Name must consist of only English letters, digits and white spaces.'
        }
    },
    description: {
        type: String,
        require: [true, 'Please enter description.'],
        minlength: [ 20, 'Description must be at least 20 characters long.' ],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9\s]+/.test(v)
            }, 
            message: 'Description must consist of only English letters, digits and white spaces.'
        }
    },
    imageUrl: {
        type: String,
        require: [true, 'Please enter imageUrl.'],
        validate: {
            validator: function(v) {
                return /(http:\/\/.+)|(https:\/\/.+)/.test(v)
                //return /(http:\/\/[A-Za-z0-9\s]+)|(https:\/\/[A-Za-z0-9\s]+)/.test(v)
            }, 
            message: 'Image url must consist of only English letters, digits and whitespaces.'
        }
    },
    difficultyLevel: {
        type: Number,
        require: [true, 'Please enter difficulty level.']
    },
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessories' }],
    creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cubes', cubeSchema);
