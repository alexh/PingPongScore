
var express = require('express');
 var pg = require('pg');
 const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';
var router = express.Router();

router.post('/start', function(req, res) {
	res.redirect('/play/current');
});

router.get('/current', function(req, res) {
	res.render('current', { title: "Current Game", player1: res.player1 });
});

router.get('/currentGame', function(req, res) {
	
	pg.connect(connectionString, (err, client, done) => {
		const results = [];
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    const query = client.query('SELECT * FROM games t1 JOIN (SELECT MAX(time) AS MAXDATE FROM games WHERE status = 0 ) t2 ON t1.time = t2.MAXDATE'); // Stream results back one row at a time
	    query.on('row', (row) => {
	      results.push(row);
	    });
	    // After all data is returned, close connection and return results
	    query.on('end', () => {
	      done();
	      return res.json(results);
	    });
  });
});


module.exports = router;