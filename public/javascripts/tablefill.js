// Userlist data array for filling in info box
var gameListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateTable();
    populateLeaderboard();

});

// Functions =============================================================


function populateLeaderboard(){
    // jQuery AJAX call for JSON
    $.getJSON( '/games/wincount/Alex/Dad', function( data ) {
        var alex = data[0];
        $('.record').html('Alex: ' + alex.count + ' Dad: ');
    });
    $.getJSON( '/games/wincount/Dad/Alex', function( data ) {
        var dad = data[0];
        $('.record').append(dad.count);
    });
}

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
            tableContent += '<td>' + this.time_string + '</td>';
            if (this.status == '1'){
                console.log('got in 111111');
                tableContent += '<td class="winner">' + this.player1 + '</td>';
                tableContent += '<td class="">' + this.score1 + '</td>';
                tableContent += '<td class="loser">' + this.player2 + '</td>';
                tableContent += '<td class="">' + this.score2 + '</td>';
            } else
            if (this.status == '2'){
                tableContent += '<td class="loser">' + this.player1 + '</td>';
                tableContent += '<td class="">' + this.score1 + '</td>';
                tableContent += '<td class="winner">' + this.player2 + '</td>';
                tableContent += '<td class="">' + this.score2 + '</td>';
            } else {
                tableContent += '<td >' + this.player1 + '</td>';
                tableContent += '<td >' + this.score1 + '</td>';
                tableContent += '<td >' + this.player2 + '</td>';
                tableContent += '<td >' + this.score2 + '</td>';
            }
            tableContent += '<td>' + this.status + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#gameList table tbody').html(tableContent);
    });
};