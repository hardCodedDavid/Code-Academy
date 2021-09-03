const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    img: {
        type: Buffer,
        require: true
    }
    
},  {timestamps: true});

const Product = mongoose.model('Product', productSchema)
module.exports = Product