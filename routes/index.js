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
  res.sendFile(path.join(__dirname,'..', 'public','index.html'));
});

router.get('/submitScore', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public', 'submitScore.html'));
});

router.post('/submitScore',function(req, res, next) {
  client.query('SELECT * FROM score WHERE name = $1 AND score = $2', [req.body.name, req.body.inputscore], function(err, result) {
    if (err) {
      console.log("unable to query SELECT");
      next(err);
    }
    if (result.rows.length > 0) {
        console.log("Name and score combination already exist.");
    }
    else {
      client.query('INSERT INTO score (name, score) VALUES($1, $2)', [req.body.name, req.body.inputscore], function(err, result) {
      if (err) {
        console.log("unable to query INSERT");
        next(err);
      }
        console.log("Score uploaded successfully.");
        res.redirect('/submitScore?message=Score+uploaded+successfully.');
      });
    }
  });
});

router.get('/loadScoreboard', function(req, res, next) {
  client.query("SELECT * FROM score ORDER BY score DESC FETCH FIRST 50 ROWS ONLY", function(err,result){
    if(err) {
      console.log("SQL ERROR");
      next(err);
    }
    else if (result.rows.length > 0) {
      console.log("There are scores to display.")
      res.json(result.rows);
    }
    else {
      console.log("No scores to display");
    }
  })
});

module.exports = router;
