// Get the elements from the DOM
const getLocationBtn = document.getElementById('getLocation');
const removeLocationBtn = document.getElementById('removeLocation');
const mapDiv = document.getElementById('map');

// Check if the Geolocation API is supported
function getLocation() {
  if (navigator.geolocation) {
    // If supported, call the getCurrentPosition method
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // If not supported, display an error message
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
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=API_KEY&center=${lat},${long}&zoom=15`;
  const iframe = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  // Display the map on the page
  mapDiv.innerHTML = iframe;
}

// Add event listeners to the buttons
getLocationBtn.addEventListener('click', getLocation);
removeLocationBtn.addEventListener('click', () => {
  localStorage.removeItem('lat');
  localStorage.removeItem('long');
  mapDiv.innerHTML = '';
  getLocationBtn.disabled = false;
});

// Check if the latitude and longitude values are already in local storage
const lat = localStorage.getItem('lat');
const long = localStorage.getItem('long');
if (lat && long) {
  // If they are, create the Google Maps iframe using the values and display it on the page
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=API_KEY&center=${lat},${long}&zoom=15`;
  const iframe = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
  mapDiv.innerHTML = iframe;
  getLocationBtn.disabled = true;
}