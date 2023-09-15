$(document).on('click', '.showMap', function() {
  // Get the longitude, latitude, and description
  const lon = $(this).data('lon');
  const lat = $(this).data('lat');
  const name = $(this).closest('tr').find('td:nth-child(1)').text(); 
  const description = $(this).closest('tr').find('td:nth-child(6)').text(); 
  const img_url = $(this).data('img_url');
 
  // Set the modal title
  $('#mapModalLabel').text('Experience: ' + name );

  // Show the map
  $('#mapModalBody').html($('#map-modal-content').html());
  $('#mapModal').modal('show');
  $('#mapModal').on('shown.bs.modal', function() {
      initMap(lat, lon, name, description, img_url);
  });
});


document.addEventListener('DOMContentLoaded', function() {
  
  $('#mapModal').on('hide.bs.modal', function() {
    // Remove the hash from the URL
    history.replaceState(null, null, ' ');

    // Reload the page
    location.reload();
  });
});


function initMapForAddExperience() {
  let map = L.map('add-experience-map').setView([52.476056979603996, -1.8986393951357], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  map.invalidateSize();

  fetch('/api/experiences')
    .then(response => response.json())
    .then(experiences => {
      experiences.forEach(experience => {
        
        let adjustedPath;
        if (!experience.img_url) {
          // Use a default image path if img_url is a falsy value
          adjustedPath = 'img/no_image.jpg';
        } else {
          // Removing the public folder from the url
          const imagePath = `http://localhost:3001/${experience.img_url}`; 
          adjustedPath = imagePath.replace('public\\', ''); 
        }

        const marker = L.marker([parseFloat(experience.lat), parseFloat(experience.lon)]);
        map.addLayer(marker);
        marker.bindPopup(`<b> ${experience.exp_name}</b> <br/> ${experience.exp_description} <br/> <img src="${adjustedPath}"  class="thumbnail"</img>`);
      });
    })
    .catch(err => {
      console.log('Error fetching experience data:', err.message);
    });
    
    let currentMarker;

    map.on('click', function(e) {
        let lat = e.latlng.lat.toFixed(4);
        let lon = e.latlng.lng.toFixed(4);

        // Remove existing marker
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        // Add new marker and store its reference
        currentMarker = L.marker([lat, lon]).addTo(map);

        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lon;
    });

    
}

document.addEventListener('DOMContentLoaded', function() {
  initMapForAddExperience();
});

