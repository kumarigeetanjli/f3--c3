const removeLocationBtn = document.getElementById('removeLoc');
const getLocationBtn = document.getElementById('getLoc');

const mapDiv = document.getElementById('map');

function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {

    mapDiv.innerHTML = "Geolocation is not supported by this browser.";
  }
}



// Callback function for the getCurrentPosition method
function showPosition(position) {

  // Get the latitude and longitude values from the position object
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  // Save the latitude and longitude values in local storage
  localStorage.setItem('lat', lat);
  localStorage.setItem('long', long);

  // Create the Google Maps iframe using the latitude and longitude values
  const iframe = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=5dc1173e87474d409b70b34c73de4da3&center=${lat},${long}&zoom=15`;


  mapDiv.innerHTML = iframe;
}

// Add event listeners
getLocationBtn.addEventListener('click', getLoc);
removeLocationBtn.addEventListener('click', () => {
  localStorage.removeItem('lat');
  localStorage.removeItem('long');
  mapDiv.innerHTML = '';
  getLocationBtn.disabled = false;
});

// Check if the latitude and longitude values are in local storage
const lat = localStorage.getItem('lat');
const long = localStorage.getItem('long');
if (lat && long) {


  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=5dc1173e87474d409b70b34c73de4da3&center=${lat},${long}&zoom=15`;
  const iframe = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  
  mapDiv.innerHTML = iframe;

  getLocationBtn.disabled = true;
}
