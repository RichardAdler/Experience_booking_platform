function initMap(lat, lon, name, description, img_url) {
  let geo = L.map('map', {
    center: [lat, lon],
    zoom: 15
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(geo);
    
  // Adjust the size of the map once it's actually displayed
  geo.invalidateSize();

  // Using the path variable to adjust what image to display wheter there is an image assigned to the experience or not
  let adjustedPath;
  
  if  (!img_url) {
      // Using a default image path if img_url is null or undefined
      adjustedPath = 'img/no_image.jpg';
  } else {
      // Removing the public folder from the url
      const imagePath = `${img_url}`; 
      adjustedPath = imagePath.replace('public\\', ''); 
  }
 
  
  // Create a single marker for this experience
  const marker = L.marker([lat, lon]).addTo(geo);
  marker.bindPopup(`<b> ${name}</b>  <br/>  ${description} </br> <img src="http://localhost:3001/${adjustedPath} " class="thumbnail"></img>`).openPopup();

  
    fetch('/experiences')
      .then(response => {
        if (!response.ok) {
          console.error('Server response error');
        } else {
          return response.json();
        }
      })
      .then(experiences => {
       
        experiences.forEach(experience => {
          
          const marker = L.marker([experience.lat, experience.lon]);
          marker.addTo(geo);
          marker.bindPopup(`Name: ${experience.exp_name} <br/> Description: ${experience.exp_description} </br>  <img src="http://localhost:3001/${experience.img_url}" class="thumbnail"></img>`);
        });
      })
      .catch(err => {
        console.log('Error fetching experience data: ', err);
      });
    }

    document.getElementById('experienceForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {formObject[key] = value});
  
      fetch('/add', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.message) {
            // Reload the page with a success parameter
            window.location.href = window.location.pathname + '?success=true';
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
  
    if (success === 'true') {
        // Show the success alert
        document.getElementById('success-alert').style.display = 'block';
    }
});