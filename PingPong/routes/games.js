
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
	    const query = client.query('SELECT * FROM games;');
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


module.exports = router;