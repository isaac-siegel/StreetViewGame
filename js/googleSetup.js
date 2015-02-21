
var lat =  37.869085;
var lon = -122.254775
var heading = 270;
var pitch = 0;

var map = new google.maps.LatLng(37.869085, -122.254775)

function initialize() {

  var panoramaOptions = {
    position: map,
    pov: {
      heading: heading,
      pitch: pitch
    },
    visible: true
  };

  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

  google.maps.event.addListener(panorama, 'pano_changed', function() {
      var panoCell = document.getElementById('pano_cell');
      panoCell.innerHTML = panorama.getPano();
  });

  // Update REST properties on each movement event 
  google.maps.event.addListener(panorama, 'position_changed', function() {
      lat = panorama.getPosition().lat();
      lon = panorama.getPosition().lng();
  });

  google.maps.event.addListener(panorama, 'pov_changed', function() {
      heading = panorama.getPov().heading;
      pitch = panorama.getPov().pitch;
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
