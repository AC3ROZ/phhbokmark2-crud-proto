'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', (req, res)=>{
    res.render('index', {title: 'Himanoa'});
});

app.listen(3000);
