const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');
const productsRouter = express.Router();

const products = require('../data/products.json');


productsRouter.route('/').get((req,res)=>{
    const url = 
    "mongodb+srv://dbUser:9oylOyba6uOCJ9VP@globomantics.vv00cuv.mongodb.net/?retryWrites=true&w=majority";
    const dbName = 'globomantics';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);
            
            const products = await db.collection('products').find().toArray();
            res.render('products', {products});
        } catch (error) {
            debug(error.stack);
        }
    client.close();
    })();
    //res.render('products', {products, });     
    // res.render('products', {products, });
 })
 
 productsRouter.route('/:id')
    .get((req,res)=>{
        const id = req.params.id;
        const url = 
        "mongodb+srv://dbUser:9oylOyba6uOCJ9VP@globomantics.vv00cuv.mongodb.net/?retryWrites=true&w=majority";
        const dbName = 'globomantics';
    
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to the mongo DB');
    
                const db = client.db(dbName);
                
                const product = await db.collection('products').findOne({_id : new ObjectID(id)});
                res.render('product', {product});
            } catch (error) {
                debug(error.stack);
            }
        client.close();
        })();
       
    })
 
    module.exports = productsRouter ;
