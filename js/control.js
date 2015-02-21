/**
 * Created by isaacsiegel on 2/21/15.
 */



var RESET_ON_PAGE_LOAD = true;
var PLAYER_1 = "Player1";
var PLAYER_2 = "Player2";
var PLAYER_3 = "Player3";
var PLAYER_4 = "Player4";
var PLAYER_ID;

var players = ["Player1", "Player2", "Player3", "Player4"];

//Global firebase base reference
var myFirebaseRef = new Firebase("https://streetviewgame.firebaseio.com/");

//Resets database when the page loads
if(RESET_ON_PAGE_LOAD){
    obliterate();
}

determinePlayerID()


function determinePlayerID(){

    myFirebaseRef.once('value', function(dataSnapshot) {

        for(var i = 0; i < players.length; i++){


            if( ! dataSnapshot.hasChild(players[i]) ) {
                PLAYER_ID = players[i];
                writeToFirebase(PLAYER_ID,"");
                return;

            }

        }
    });
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
    else{
        userRef.on("value", function(result) {
            //TODO set the appropriate image box to the returned url
            if(result.val() != null)
                populateImageView(userName, result.val().URL)
        });
    }
}

function populateImageView(user, url)
{
    var userID = "#"+user;

    $(userID).attr("src", url);
}



// Subscribe to event
for(var i = 0; i < players.length; i++)
{
    subscribeToDb(players[i]);
}