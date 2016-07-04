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
        res.render('index', {datas: result});
    });
});
app.get('/read', (req, res) => {
    connection.query('SELECT * FROM bookmark', (err, result, fields) => {
        res.render('read', {datas: result});
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
app.post('/delete', (req, res)=>{
    let deleteId = req.body.id;
    connection.query('DELETE FROM `bookmark` WHERE `id` = ?',[deleteId], (err, result, fields) => {
        if(err){
            console.err(err);
        }
    });
});
app.get('/update/:id', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM `bookmark` WHERE `id` = ?', [id], (err, result, fields) => {
        console.log(result);
        if(err){
            console.err(err);
        }
        res.render('update', { data: result[0] });
    })
})
app.post('/update/:id', (req, res) => {
    let updateId = req.params.id;
    client.fetch(req.body.url, {}, (err, $, res) => {
        if(err){
            console.error(err);
        }
        let pageTitle = $('title').text();
        connection.query('UPDATE `bookmark` SET url=?, page_title=?, _comment=? WHERE `id` = ?',
            [req.body.url, pageTitle, req.body.comment, updateId], (err, result, fields) => {
                if(err){
                    console.error(err);
                }
            });
    });
});
app.listen(3000);
