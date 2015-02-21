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

// ReEnable a disabled button
function reEnableButton(buttonId)
{
    var button = '#' + buttonId;
    $('button').prop("disabled", false);
}

// Disable "yes" buttons and renable them some time later
function ProcessYesButton()
{
    $(this).prop("disabled",true);
    var buttonId = $(this).prop('id');

    incrementVote(1, buttonId);

    setTimeout(function(){ reEnableButton(buttonId) }, 1000);
}

// Disable "no" buttons and renable them some time later
function ProcessNoButton()
{


    $(this).prop("disabled",true);
    var buttonId = $(this).prop('id');
    incrementVote(-1, buttonId);

    setTimeout(function(){ reEnableButton(buttonId) }, 1000);
}

function incrementVote(amount, buttonId){
    var playerID = buttonId.substr(0,7);


    var voteRef = myFirebaseRef.child(playerID).child("votes");

    voteRef.once("value", function(result) {
        voteRef.set(result.val()+amount)
    } )




}

