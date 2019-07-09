const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongodb = require('mongodb');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling Get requests to /products"
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id : new mongodb.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });

    product.save().then(result )

    res.status(201).json({
        message : "Handling Post requests to /products",
        createdProduct : product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id) {
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message : 'Updated product!'
    });
});

router.delete('/:productId',(req, res, next) => {
    res.status(200).json({
        message : 'Deleted product!'
    });
});
module.exports = router;
