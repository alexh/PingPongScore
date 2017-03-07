
var express = require('express');
 var pg = require('pg');
 const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';
var router = express.Router();

/*
 * GET gamelist.
 */
router.get('/gamelist', function(req, res) {

	pg.connect(connectionString, (err, client, done) => {
		const results = [];
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    const query = client.query('SELECT *, to_char(time, \'HH:MI AM MM/DD/YY\') as time_string FROM games ORDER BY time DESC;');
	    // Stream results back one row at a time
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



/*
 * GET leaderboard.
 */
router.get('/wincount/:player1/:player2', function(req, res) {
	console.log('got here~!!!!');
	var player1 = req.params.player1
	var player2 = req.params.player2

	pg.connect(connectionString, (err, client, done) => {
		const results = [];
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    const query = client.query('SELECT COUNT(*) FROM games WHERE (upper(player1) LIKE upper(\'%'+player1+'%\') AND upper(player2) LIKE upper(\'%'+player2+'%\') AND status = \'1\') OR (upper(player2) LIKE upper(\'%'+player1+'%\') AND upper(player1) LIKE upper(\'%'+player2+'%\') AND status = \'2\');');
	    // Stream results back one row at a time
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

/*
 * GET leaderboard.
 */
router.get('/alex', function(req, res) {

	pg.connect(connectionString, (err, client, done) => {
		const results = [];
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    const query = client.query('SELECT COUNT(*) FROM games WHERE (player1 = \'Alex\' AND player2 = \'Dad\' AND status = \'1\') OR (player2 = \'Alex\' AND player1 = \'Dad\' AND status = \'2\');');
	    // Stream results back one row at a time
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

router.get('/dad', function(req, res) {
	console.log('start dad');
	pg.connect(connectionString, (err, client, done) => {
		const results = [];
	    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Select Data
	    const query = client.query('SELECT COUNT(*) FROM games WHERE (player1 = \'Dad\' AND player2 = \'Alex\' AND status = \'1\') OR (player2 = \'Dad\' AND player1 = \'Alex\' AND status = \'2\');');
	    // Stream results back one row at a time
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

/*
 * GET current game
 */
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