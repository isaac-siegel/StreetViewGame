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
    writeToFirebase("isaac",{URL: rest});

}