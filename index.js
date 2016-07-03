'use strict';

var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', (req, res)=>{
    res.render('index', {title: 'Himanoa'});
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/add', (req, res) => {
    console.log(req.body);
});

app.listen(3000);
