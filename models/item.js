const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const itemSchema = new Schema({
    name:{
        type: String,
        rquired: true,
        unique: true,
        minlength: 3
    },
    data:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
});

const Item = mongoose.model('Item',itemSchema);

module.exports = Item;