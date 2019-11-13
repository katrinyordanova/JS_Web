const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        //validation
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube'}]
});

module.exports = mongoose.model('Accessories', accessorySchema);