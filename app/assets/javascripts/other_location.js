$(document).ready(function(){
  $('input.other_search').click(function (e) {
    e.preventDefault();
    var url = $('#emergency').val().replace(/\s/g,"+");
    var err = $('.error');
    var closest = $('.closest');
    closest.empty();
    {
    if (navigator.geolocation)
      {
      navigator.geolocation.getCurrentPosition(findPosition);
      }
    else {
      err.innerHTML = "Geolocation is not supported by this browser.";}
    }
  function findPosition(position)
    {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude,
            },
        success: function (data) {
          if (data == null) {
            closest.append("SORRY, we can't find any restaurants serving " + url.replace(/\+/g," ") + ". We wish you all the best in your evening's adventures.")
          }
          if (data == 'curses'){
            closest.append('Are you kidding? You thought "' + url.replace(/\+/g," ") + '" was an appropriate search? You should be ashamed of yourself. Go sleep it off.')
          }
          else {
            closest.append("The closest open restaurant is at: " + data['name'] +
                                "<br> They are located at " + data['vicinity'] +
                                "<br> <a href='http://maps.google.com/?q&saddr=" +
                                  position.coords.latitude + "," +
                                  position.coords.longitude +
                                  "&daddr=" + data['vicinity'] + "&dirflg=w'> Walking directions </a>");
          }
        }
      });
    }

  function errorCallback(error) {
        alert('ERROR(' + error.code + '): ' + error.message);
    }
  });
});
 