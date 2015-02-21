/**
 * Created by isaacsiegel on 2/21/15.
 */



var RESET_ON_PAGE_LOAD = true;


//Global firebase base reference
var myFirebaseRef = new Firebase("https://streetviewgame.firebaseio.com/");

//Resets database when the page loads
if(RESET_ON_PAGE_LOAD){
    obliterate();
}



//Executed on button press
function userFoundLocation()
{

    var url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10"
    var userName = "isaac";


    //TODO: remove and replace with   pull current data  from street view
    var object = {

        snapshotURL: url

    }


    writeToFirebase( userName,object);
}


function writeToFirebase(userName,obj){

    myFirebaseRef.child(userName).set(obj);

    //myFirebaseRef.push(obj)


}

function obliterate(){
    myFirebaseRef.set({});
}


function getUserImageURL(userName){
    var userRef = myFirebaseRef.child(userName);

    userRef.on("value", function(result) {
        console.log(result.val());
        //TODO set the appropriate image box to the returned url
        populateImageView(userName, result.val().snapshotURL)
    });

}


function populateImageView(user, url){
    console.log("inside populateImageView")

    var userID = "#"+user;

    $(userID).attr("src", url);
}

