
var express = require('express');
 var pg = require('pg');
 const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';
var router = express.Router();

router.post('/start', function(req, res) {
	res.redirect('/play/current');
});

router.get('/current', function(req, res) {
	res.render('current');
});

router.post('/add', function(req, res) {
	var player = req.body.player;
	var id = req.body.id;
	var score = req.body.score;
	res.render('current');
});



module.exports = router;