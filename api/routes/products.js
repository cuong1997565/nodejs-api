const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductControler = require('./../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() +"_"+ file.originalname);
  }
});

const fileFilter = (req,file,cb) => {
    //reject a file 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter : fileFilter
});

//list product
router.get('/', checkAuth, ProductControler.products_get_all);

//create product
router.post('/', checkAuth , upload.single('productImage') , ProductControler.product_create);

//edit product
router.get('/:productId',checkAuth,ProductControler.product_edit);

//update product
router.patch('/:productId',checkAuth, ProductControler.product_update);

//delete product
router.delete('/:productId',checkAuth, ProductControler.product_delete);

module.exports = router;