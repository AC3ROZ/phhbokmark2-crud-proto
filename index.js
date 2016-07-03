'use strict';

var express = require('express');
var app = express();

app.get('/', (req, res)=>{
    res.send('HelloWorld');
});

app.listen(3000);
