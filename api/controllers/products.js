const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
    Product.find().sort({_id : -1})
    .select('name price productImage  _id')
    .exec()
    .then(docs => {
       if(docs.length >= 0) {
        res.status(200).json({
            message  : "Handling Get requests to /products",
            count    : docs.length,
            products : docs.map(doc => {
                return {
                    _id : doc._id,
                    name : doc.name,
                    price : doc.price,
                    productImage: doc.productImage,
                    request : {
                        type : 'GET',
                        url  : 'http://localhost:3000/products/'+ doc._id 
                    }
                }
            })
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
}

exports.product_create = (req, res, next) => {
    const product = new Product({
        _id   : new mongoose.Types.ObjectId(),  
        name  : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    });
    product.save().then(result => {
        res.status(201).json({
            message : "Handling Post requests to /products",
            createdProduct : {
                _id : result._id,
                name: result.name,
                price : result.price,
                productImage : result.productImage,
                request : {
                    type : 'GET',
                    url  : 'http://localhost:3000/products/'+ result._id 
                }
            }
        });
    }).catch(err => console.log(err));
}

exports.product_edit =  (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json({
                message : 'You discovered the special ID',
                product :  doc,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/products/'+doc._id
                }
            });
        } else{
            res.status(404).json({message : 'No valid entry found for provided ID' })
        }
    }).catch(err => {
        console.log(err);
        res.status(200).json({error : err});
    })
}

exports.product_update = (req, res, next) => {
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
        console.log(result);
        res.status(200).json({
            message : 'Update product!',
            product : result,
            request : {
                type : 'GET',
                url : 'http://localhost:3000/products/'+ id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
}

exports.product_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(response => {
        res.status(200).json({
            message : 'Deleted product!',
            request : {
                type : 'POST',
                url : 'http://localhost:3000/products',
                body: { name : 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}