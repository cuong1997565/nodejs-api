const mongodb = require('mongodb');

const productSchema = mongodb.Schema({
    _id : mongodb.Types.ObjectId,
    name : String,
    price : Number
});

module.exports = mongodb.model('Product', productSchema);