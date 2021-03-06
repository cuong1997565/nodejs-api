const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const mongodb = require('mongodb');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();        
});

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/nodejs';
MongoClient.connect(url, {useMongoClient: true}, function(err, db) {
    if(err) {
        console.log('Unable to connect to the server ', err);
    } else {
        console.log("Connection mongodb");
    }
});


//routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
});

module.exports = app;