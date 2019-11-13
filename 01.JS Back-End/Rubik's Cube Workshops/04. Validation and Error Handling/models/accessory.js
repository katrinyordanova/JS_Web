const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter accessory name.'],
        minlength: [ 5, 'Name must be at least 5 characters long.'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9\s]+/.test(v)
            },
            message: 'Name must contain only English letters, digits and white spaces!'
        }
    },
    imageUrl: {
        type: String,
        require: [ true, 'Please enter image url.'],
        validate: {
            validator: function(v) {
                return /(http:\/\/.+)|(https:\/\/.+)/.test(v)
                //return /(http:\/\/[A-Za-z0-9\s]+)|(https:\/\/[A-Za-z0-9\s]+)/.test(v)
            },
            message: 'Image url must contain only English letters, digits and whitespaces!'
        }
    },
    description: {
        type: String,
        require: [true, 'Please enter description.'],
        minlength: [ 20, 'Description must be at least 20 characters long.'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9\s]+)/.test(v)
            },
            message: 'Description must contain only English letters, digits and whitespaces!'
        }
    },
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cubes'}]
});

module.exports = mongoose.model('Accessories', accessorySchema);