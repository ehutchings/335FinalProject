var express = require('express');
var router = express.Router();
var path = require('path');

const Client = require('pg').Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/endGame', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public', 'books.html'));
});

module.exports = router;
