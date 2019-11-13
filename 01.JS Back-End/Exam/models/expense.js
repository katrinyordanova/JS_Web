const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: [ true, 'Merchant is required!'],
        min: [4, 'Merchant must be at least 4 characters long!']
    },
    date: {
        type: Date,
        required: [ true, 'Date is required!'],
        default: Date.now
    },
    total: {
        type: Number,
        required: [ true, 'Total is required!'],
        validate: {
            validator: Number, 
            message: 'Total must consist of only English letters and digits.'
        }
    },
    category: {
        type: String,
        required: [ true, 'Category is required!']
    },
    description: {
        type: String,
        required: [ true, 'Description is required!'],
        minlength: 10,
        maxlength: 50
    },
    report: {
        type: Boolean,
        required: [ true, 'Report is required!'],
        default: false
    },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Expense', expenseSchema);