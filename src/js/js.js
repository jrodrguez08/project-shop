function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {}

    function showPosition(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        var responsive = "img-responsive"
        var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false";
        document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "' class='" + responsive + "'>";
    }

    function showError(error) {
        switch (error.code) {}
    }
}