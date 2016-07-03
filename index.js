'use strict';
var client = require('cheerio-httpcli');
var express = require('express');
var app = express();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    database: 'proto_bookmark'
});

const bodyParser = require('body-parser');

app.use(bodyParser());
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', (req, res)=>{
    connection.query('SELECT * FROM bookmark', (err, result, fields) => {
        console.log(result);
        res.render('index', {datas: result});
    });
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/add', (req, res) => {
    console.log(req.body);
    var url = req.body.url;
    client.fetch(url, {}, (err, $, res) =>{
        if(err){
            console.log(err);
            return 0;
        }
        let title = $('title').text();
        connection.query('INSERT INTO `bookmark` (`url`, `page_title`,`_comment`) VALUES (?,?,?)'
            ,[url, title, req.body.comment], (err, result, fields) =>{
                if(err){
                    console.log(err);
                }
            });
    });   
});

app.listen(3000);
