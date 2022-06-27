const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true,
        
    },
    categories: {
        type: Array,
        require: true
    },
    size: {
        type: Array,
       
    },
    color: {
        type: Array,
       
    },
    price: {
        type: Number,
        require: true
    },
   
   
   
}, {timestamps : true})

const Product = mongoose.model('PRODUCT', productSchema);

module.exports = Product;