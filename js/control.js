/**
 * Created by isaacsiegel on 2/21/15.
 */

var RESET_ON_PAGE_LOAD = false;
var PLAYER_1 = "Player1";
var PLAYER_2 = "Player2";
var PLAYER_3 = "Player3";
var PLAYER_4 = "Player4";
var PLAYER_ID;
var MAX_VOTE_TOTAL = 5;

var players = ["Player1", "Player2", "Player3", "Player4"];

//Global firebase base reference
var myFirebaseRef = new Firebase("https://streetview2.firebaseio.com/");

var gameRoomName = prompt("Enter the name of your gameroom");

myFirebaseRef = myFirebaseRef.child(gameRoomName);

//Resets database when the page loads
if(RESET_ON_PAGE_LOAD){
    obliterate();
}

determinePlayerID()
endGame()


function determinePlayerID(){

    myFirebaseRef.once('value', function(dataSnapshot) {

        for(var i = 0; i < players.length; i++){


            if( ! dataSnapshot.hasChild(players[i]) ) {
                PLAYER_ID = players[i];
                writeToFirebase(PLAYER_ID,"");
                initializeStartCoordinate(PLAYER_ID);

                if(PLAYER_ID == PLAYER_1)
                {
                    var object = prompt("Select something to Find!", "Ex: a red car");
                    myFirebaseRef.child("prompt").set(object);



                }
                 {
                    myFirebaseRef.child("prompt").on('value', function(dataSnapshot) {
                        if(dataSnapshot.val() != null)
                            swal({   title: "Find: "+dataSnapshot.val(),   text: "You are: "
                                    +PLAYER_ID + "  Ready. Set. Go.",   timer: 5000 });

                    })

                }

                return;

            }

        }
    });
}


function initializeStartCoordinate(playerID) {
    var difLat = .0009;
    var difLong = .001186;

    var sLat = 40.758721;
    var sLong = -73.984759;

    //var sLat = 37.802209;
    //var sLong = -122.417968 ;

    var initialLat = 0;
    var initialLong = 0;


    if(playerID == PLAYER_1){
        initialLat = sLat + difLat+.00004;
        initialLong = sLong;

    }
    else if(playerID == PLAYER_2){
        initialLat = sLat - difLat;
        initialLong  = sLong;

    }
    else if(playerID == PLAYER_3){
        initialLat = sLat;
        initialLong  = sLong + difLong;

    }
    else if(playerID == PLAYER_4){
        initialLat = sLat ;
        initialLong  = sLong - difLong -.0019;

    }

    setTimeout(function(){changeLocation(initialLat, initialLong) }, 50);
    //Im so sorry
}

//Executed on button press
function userFoundLocation()
{

}


function writeToFirebase(userName,obj){

    myFirebaseRef.child(userName).set(obj);

    //myFirebaseRef.push(obj)
}

function obliterate(){
    myFirebaseRef.set({});
}

// subscribe to user's table data event changes
function subscribeToDb(userName){

    var userRef = myFirebaseRef.child(userName);

    if (userRef == null) {
        console.log("userRef == null")
        return;

    }
    else
    {
        userRef.child('URL').on("value", function(result) {
            //TODO set the appropriate image box to the returned url
            if(result.val() != null)
            {
                populateImageView(userName, result.val())
            }
        });
    }
}

function populateImageView(user, url)
{
    // Construct Id for image pane corresponding to player
    var userId = "#"+user;

    // Update Image pane
    $(userId).attr("src", url);
    
    // Enable yes and no button corresponding to image pane
    EnableButtons(user);
}

// Subscribe to event
for(var i = 0; i < players.length; i++)
{
    subscribeToDb(players[i]);
}


function endGame(){
    myFirebaseRef.on('value', function(result) {
        var total = 0;
        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var t4 = 0;

        if(result.child(PLAYER_1).val() != null)
            if(result.child(PLAYER_1).val() != "")
                t1 = result.child(PLAYER_1).val().votes
        if(result.child(PLAYER_2).val() != null)
            if(result.child(PLAYER_2).val() != "")
                t2 = result.child(PLAYER_2).val().votes
        if(result.child(PLAYER_3).val() != null)
            if(result.child(PLAYER_3).val() != "")
                t3 = result.child(PLAYER_3).val().votes
        if(result.child(PLAYER_4).val() != null)
            if(result.child(PLAYER_4).val() != "")
                t4 = result.child(PLAYER_4).val().votes

        total = t1+t2+t3+t4;

        if (total >= MAX_VOTE_TOTAL)
        {
            displayScoreBoard(t1,t2,t3,t4);
        }
    })
}

function  displayScoreBoard(t1,t2,t3,t4)  {

    swal({   title: "SCOREBOARD",   text:  PLAYER_1 + ": "+t1 +" \n "
                                            + PLAYER_2 + ": "+t2 +" \n "
                                        +   PLAYER_3 + ": "+t3 +" \n "
                                    + PLAYER_4 + ": "+t4 +" \n "
    ,   timer: 100000 });

    obliterate();

}




