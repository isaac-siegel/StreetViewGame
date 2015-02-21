// String formatter function
String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}

// Generates Google REST string
function GenerateRest (lat, lon, heading, pitch)
{
	var GOOGLE_REST = "https://maps.googleapis.com/maps/api/streetview?size=" +
        "400x400&location={0},{1}&fov=90&heading={2}&pitch={3}";
	return String.format(GOOGLE_REST, lat, lon, heading, pitch)
}

// Helper function
function SendDbEntry()
{
    // Generate REST for current position
    var rest = GenerateRest(lat, lon, heading, pitch);

    // TODO:
    // Create data package structure here and pass to writeToFirebase

    // Push REST to database
    writeToFirebase(PLAYER_ID,{URL: rest, votes: 0});

}

function HideAllButtons()
{
    $(this).find('.btn-custom').slideUp(250); //.fadeOut(205)
    $(this).find('.btn-custom2').slideUp(250); //.fadeOut(205)
}

// Enable Buttons for a specific user pane
function EnableButtons(user)
{
    var buttonYesId = '#' + user + 'Yes';
    var buttonNoId = '#' + user + 'No';

    // Enable both buttons
    $(buttonYesId).prop("disabled", false);
    $(buttonNoId).prop("disabled", false);
}

// Disable Buttons for a specific user pane
function DisableButtons(buttonId)
{
    var playerId = buttonId.substr(0,7);
    var buttonYesId = '#' + playerId + 'Yes';
    var buttonNoId = '#' + playerId + 'No';

    // Disable both buttons
    $(buttonYesId).prop("disabled", true);
    $(buttonNoId).prop("disabled", true);
}

// Disable All Buttons
function DisableAllButtons()
{
    var playerConst = "Player{0}"
    for(var i = 1; i < 5; i++)
    {  
       DisableButtons(String.format(playerConst, i)) 
    }
}

// Disable "yes" buttons and renable them some time later
function ProcessYesButton()
{
    //$(this).prop("disabled",true);
    var buttonId = $(this).prop('id');

    // Disable voting buttons
    DisableButtons(buttonId);

    // Apply vote
    incrementVote(1, buttonId);
}

// Disable "no" buttons and renable them some time later
function ProcessNoButton()
{
    //$(this).prop("disabled",true);
    var buttonId = $(this).prop('id');

    // Disable voting buttons
    DisableButtons(buttonId);

    // Apply vote
    incrementVote(-1, buttonId);
}

function incrementVote(amount, buttonId){
    var playerID = buttonId.substr(0,7);

    var voteRef = myFirebaseRef.child(playerID).child("votes");

    voteRef.once("value", function(result) {
        voteRef.set(result.val()+amount)
    } )
}

/***************************************************************
*
*                       Run Time Code
*
***************************************************************/
$(function(){
$('.card').hover(function(){
        $(this).find('.btn-custom').slideDown(250);
    },function(){
        $(this).find('.btn-custom').slideUp(250); //.fadeOut(205)
    });
})

$(function(){
$('.card').hover(function(){
        $(this).find('.btn-custom2').slideDown(250);
    },function(){
        $(this).find('.btn-custom2').slideUp(250); //.fadeOut(205)
    });
})

// Function to point all yes buttons' click() to ProcessYesButton()
$(document).ready( function() {
     $('.btn-custom').on('click', ProcessYesButton);
});

// Function to point all yes buttons' click() to ProcessYesButton()
$(document).ready( function() {
     $('.btn-custom2').on('click', ProcessNoButton);
});

$(document).ready( HideAllButtons)

// All buttons are disabled at start of game
DisableAllButtons()
