const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require("mongoose");
//list product
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
       console.log(docs);
       if(docs.length >= 0) {
        res.status(200).json({
            message : "Handling Get requests to /products",
            data : docs
        });
       } else {
            res.status(404).json({
                message : 'No entries found'
            })
       }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });
});

//create product
router.post('/', (req, res, next) => {
    const product = new Product({
        _id   : new mongoose.Types.ObjectId(),  
        name  : req.body.name,
        price : req.body.price
    });
    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message : "Handling Post requests to /products",
        createdProduct : product
    });
});

//edit product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            console.log(doc);
            res.status(200).json({
                message : 'You discovered the special ID',
                id      : id,
                data    : doc
            });
        } else{
            res.status(404).json({message : 'No valid entry found for provided ID' })
        }
    }).catch(err => {
        console.log(err);
        res.status(200).json({error : err});
    })
});

//update product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const update = {
        name  : req.body.name,
        price : req.body.price
    };
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    Product.update({ _id: id }, { $set: update})
      .exec()
      .then(result => {
        res.status(200).json({
            message : 'Update product!',
            id : id,
            data : result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

//delete product
router.delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(response => {
        res.status(200).json({
            message : 'Deleted product!',
            id : id,
            data : response
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});
module.exports = router;