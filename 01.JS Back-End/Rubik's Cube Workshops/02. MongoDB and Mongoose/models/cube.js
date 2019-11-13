const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    imageUrl: {
        type: String,
        required: true,
        //validation
    },
    difficultyLevel: {
        type: Number,
        required: true,
        minLength:1,
        maxLength:6
    },
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessories' }]
});

module.exports = mongoose.model('Cube', cubeSchema);
