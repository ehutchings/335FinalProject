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
  playerName = req.body.name;
  score = req.body.inputscore;
  gamemode = req.body.gamemode;
  console.log(gamemode);
  playerName = playerName.toUpperCase();
  if (validateInputs(playerName, score, gamemode, res) == false)
  {
    return
  }
  else if (gamemode == '1life')
  {
    client.query('SELECT * FROM score WHERE name = $1 AND score = $2', [req.body.name, req.body.inputscore], function(err, result) {
      if (err) {
        console.log("unable to query SELECT");
        next(err);
      }
      if (result.rows.length > 0) {
          res.redirect('/submitScore?message=Name+and+score+combination+already+exist.&score=' + String(score) + '&gamemode=' + gamemode);
      }
      else {
        client.query('INSERT INTO score (name, score) VALUES($1, $2)', [req.body.name, req.body.inputscore], function(err, result) {
        if (err) {
          console.log("unable to query INSERT");
          next(err);
        }
          console.log("Score uploaded successfully.");
          res.redirect('/submitScore?message=Score+uploaded+successfully.&score=Submitted!&gamemode=' + gamemode);
        });
      }
    });
    }
    else if (gamemode == '3lives')
    {
      client.query('SELECT * FROM score3lives WHERE name = $1 AND score = $2', [req.body.name, req.body.inputscore], function(err, result) {
        if (err) {
          console.log("unable to query SELECT");
          next(err);
        }
        if (result.rows.length > 0) {
            res.redirect('/submitScore?message=Name+and+score+combination+already+exist.&score=' + String(score) + '&gamemode=' + gamemode);
        }
        else {
          client.query('INSERT INTO score3lives (name, score) VALUES($1, $2)', [req.body.name, req.body.inputscore], function(err, result) {
          if (err) {
            console.log("unable to query INSERT");
            next(err);
          }
            console.log("Score uploaded successfully.");
            res.redirect('/submitScore?message=Score+uploaded+successfully.&score=Submitted!&gamemode=' + gamemode);
          });
        }
      });
    }
  });

 function validateInputs(name, score, gamemode, res)
 {
  if (name.length > 5)
  {
    console.log("Player name greater than 5 characters.");
    res.redirect("/submitScore?score=" + String(score) + '&message=Player+name+is+too+long.&gamemode=' + gamemode);
    return false;
  }
  else
  {
    if (!isNaN(parseFloat(score)) == "True" || score.length > 3 || score == '')
    {
      console.log("Invalid score.")
      res.redirect("/submitScore?message=Invalid+score.+Please+play+again+to+get+a+new+score.&gamemode=" + gamemode)
      return false;
    }
 }
 return true;
}

router.get(`/loadScoreboard/:gamemode`, function(req, res, next) {
  gamemode = req.params['gamemode'];
  console.log(gamemode);
  if (gamemode == "1life")
  {
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
  });
}
else if (gamemode == "3lives")
{
  client.query("SELECT * FROM score3lives ORDER BY score DESC FETCH FIRST 50 ROWS ONLY", function(err,result){
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
  });
}
else
{
  res.json('None');
}
});

module.exports = router;
