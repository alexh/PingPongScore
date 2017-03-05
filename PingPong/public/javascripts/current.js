
// DOM Ready =============================================================
$(document).ready(function() {
		// Populate the user table on initial page load
		populateCurrent();

		setInterval(function(){ 
			populateCurrent();
			console.log('updated');
		}, 500);

});

// Functions =============================================================

// Fill table with data
function populateCurrent() {

	// jQuery AJAX call for JSON
	$.getJSON( '/games/currentGame', function( data ) {
		var game = data[0];
		score1 = game.score1;
		score2 = game.score2;
		 $('.player1 #name').html(game.player1);
		 $('.player1 #score').html(game.score1);
		 $('.player2 #name').html(game.player2);
		 $('.player2 #score').html(game.score2);
		 $('.game').html(game.id);


		 if ((score1 >= 21 || score2 >= 21) && (score1 > score2 + 1 || score2 > score1 + 1)){
			var winner = '';
			if(score1 > score2){
				winner = 1;
				winnerName = game.player1;
			} else {
				winner = 2;
				winnerName = game.player2;
			}
			$('.alert').html(winnerName + ' has won!');
			gameWon(winner);
		}

	});
};

function addScore(player, score){
		var id = $('.game').html();
		$.ajax({
			type: "POST",
			url: "/play/add",
			data: {
				player: player,
				score: score,
				id: id
			},
			complete: function(){
				populateCurrent();
			},
			dataType: JSON
		});
}

function gameWon(player){
	var id = $('.game').html();
		$.ajax({
			type: "POST",
			url: "/play/complete",
			data: {
				player: player,
				id: id
			},
			complete: function(){
				$('.player1 #addbutton').hide();
				$('.player1 #subbutton').hide();

				$('.player2 #addbutton').hide();
				$('.player2 #subbutton').hide();
			},
			dataType: JSON
		});
}