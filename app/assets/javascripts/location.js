$(document).ready(function(){
  $('input.location').click(function (e) {
    e.preventDefault();
    var url = document.querySelector('form.button_to').action;
    var lon = document.querySelector('.long');
    var lat = document.querySelector('.lat');
    var err = document.querySelector('.error');
    var closest = document.querySelector('.closest');
    {
    if (navigator.geolocation)
      {
      navigator.geolocation.getCurrentPosition(findPosition);
      }
    else{x.innerHTML = "Geolocation is not supported by this browser.";}
    }
  function findPosition(position) 
    {
    lat.innerHTML = "Latitude: " + position.coords.latitude;
    lon.innerHTML = 'Longitude:' + position.coords.longitude;
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude
            },
        success: function (data) {
          console.log(data);
          closest.innerHTML = ("The closest tacos are at: " + data.name +
                                "<br> They are located at " + data.location.display_address.join(' '));
        }
      });
    }

  function errorCallback(error) {
        alert('ERROR(' + error.code + '): ' + error.message);
    }
  });
});

 