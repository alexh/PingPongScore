
var express = require('express');
var pg = require('pg');
 const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';
var router = express.Router();

router.post('/start', function(req, res) {
	var player1 = req.body.player1;
	var player2 = req.body.player2;
	var password = req.body.password;
	console.log(player1 + player2);

	pg.connect(connectionString, (err, client, done) => {
		var results = {};
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    var passwordCheck = 'SELECT COUNT(*) FROM passwords WHERE value = \'' + password + '\';';
	    console.log(passwordCheck);
	    var pwq = client.query(passwordCheck);
	    var wasValid = false;
	    pwq.on('row', function(row, result) {
      		if (row.count >= 1){
      			wasValid = true;
      		}
    	});
    	pwq.on('end', function(row, result) {
      		if (wasValid){
		    	var queryString = 'INSERT INTO games ("player1", "player2") values(\''+ player1 + '\', \'' + player2 + '\');';
		    	// console.log(queryString);
	    		const query = client.query(queryString);
	    		res.redirect('/play/current');
		    } else {
		    	res.redirect('/');
		    }
    	});
	    // // Stream results back one row at a time
	    // query.on('row', (row) => {
	    // });
	    // // After all data is returned, close connection and return results
	    // query.on('end', () => {
	    //   done();
	    // });
  	});
});

router.get('/current', function(req, res) {
	res.render('current');
});

router.post('/add', function(req, res) {
	var player = req.body.player;
	var id = req.body.id;
	var score = req.body.score;

	var playerString = '';
	if (player == 1){
		playerString = 'score1';
	} else {
		playerString = 'score2';
	}


	pg.connect(connectionString, (err, client, done) => {
		var results = {};
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    var queryString = 'UPDATE games SET ' + playerString + " = " + playerString + " + " + score + ' WHERE id = ' + id;
	    console.log(queryString);
	    const query = client.query(queryString);
	    // Stream results back one row at a time
	    query.on('row', (row) => {
	    });
	    // After all data is returned, close connection and return results
	    query.on('end', () => {
	      done();
	    });
  });

	res.render('current');

});

router.post('/complete', function(req, res) {
	var player = req.body.player;
	var id = req.body.id;
	console.log(id);


	pg.connect(connectionString, (err, client, done) => {
		var results = {};
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    var queryString = 'UPDATE games SET status  = ' + player + ' WHERE id = ' + id;
	    console.log(queryString);
	    const query = client.query(queryString);
	    // Stream results back one row at a time
	    query.on('row', (row) => {
	    });
	    // After all data is returned, close connection and return results
	    query.on('end', () => {
	      done();
	    });
  });

	res.render('current');

});



module.exports = router;