const express = require('express');
const chalk = require('chalk');
const debug =require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/roouter/productsRouter');
const adminRouter = require('./src/roouter/adminRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');
 
app.get('/home',(req,res)=>{
    res.render('home', {title: 'Products' });
 });
 app.get('/',(req,res)=>{
   res.render('home', {title: 'Products' });
});

app.use('/products', productsRouter);
app.use('/admin', adminRouter);

console.log(PORT)
app.listen(PORT,()=>{
   debug(`listening on port ${chalk.green(PORT)}` );
});