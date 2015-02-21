/**
 * Created by isaacsiegel on 2/21/15.
 */


var myFirebaseRef = new Firebase("https://streetviewgame.firebaseio.com/");




function writeToFirebase(){

    myFirebaseRef.set({
        title: "Hello World!",
        author: "Firebase",
        location: {
            city: "San Francisco",
            state: "California",
            zip: 94103
        }
    });


}

