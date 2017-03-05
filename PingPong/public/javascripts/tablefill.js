// Userlist data array for filling in info box
var gameListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/games/gamelist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            // tableContent += '<td><a href="#" class="linkshowgame" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.player1 + '</td>';
            tableContent += '<td>' + this.score1 + '</td>';
            tableContent += '<td>' + this.player2 + '</td>';
            tableContent += '<td>' + this.score2 + '</td>';
            tableContent += '<td>' + this.status + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#gameList table tbody').html(tableContent);
    });
};