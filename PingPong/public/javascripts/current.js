
// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateCurrent();

});

// Functions =============================================================

// Fill table with data
function populateCurrent() {

    // jQuery AJAX call for JSON
    $.getJSON( '/games/currentGame', function( data ) {
        var game = data[0];
         $('.player1 #name').html(game.player1);
         $('.player1 #score').html(game.score1);
         $('.player2 #name').html(game.player2);
         $('.player2 #score').html(game.score2);
         $('.game').html(game.id);
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
      dataType: JSON
    });
}