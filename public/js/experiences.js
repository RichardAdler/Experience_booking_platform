function bookingActivity(event, buttonElement) {
    event.preventDefault();
    
    const activityId = buttonElement.getAttribute('data-activity-id');
    const expName = buttonElement.getAttribute('data-exp-name');
    const expType = buttonElement.getAttribute('data-exp-type');
    const country = buttonElement.getAttribute('data-country');
    const region = buttonElement.getAttribute('data-region');
    const expDescription = buttonElement.getAttribute('data-exp-description');
    const img_url = buttonElement.getAttribute('data-img_url');
    let adjustedPath;
  
        if  (!img_url) {
            // Using a default image path if img_url is null or undefined
            adjustedPath = 'img/no_image.jpg';
        } else {
            // Removing the public folder from the url
            const imagePath = `${img_url}`; 
            adjustedPath = imagePath.replace('public\\', ''); 
        }

    const queryString = `activityId=${activityId}&expName=${expName}&expType=${expType}&country=${country}&region=${region}&expDescription=${expDescription}&img_url=${adjustedPath}`;
    
    window.location.href = `/booking?${queryString}`;
}

function clearInput(id) {
    document.getElementById(id).value = "";
}

async function search() {
    const searchRegion = document.getElementById('searchRegion').value;
    const searchCountry = document.getElementById('searchCountry').value;
  
    const queryParams = new URLSearchParams();
  
    if (searchRegion) {
      queryParams.append('region', searchRegion);
    }
  
    if (searchCountry) {
      queryParams.append('country', searchCountry);
    }
  
    try {
      const response = await fetch(`/search?${queryParams.toString()}`);
      const data = await response.json();

        if(response.ok){
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';

            data.activities.forEach((activity) => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td> ${activity.exp_name} </td>
                    <td> ${activity.exp_type} </td>
                    <td> ${activity.country} </td>
                    <td> ${activity.region} </td>
                    <td><a href="#" class="showMap" data-lon="${activity.lon}" data-lat="${activity.lat}" data-name="${activity.exp_name}">Show On Map</a></td>
                    <td> ${activity.exp_description} </td>
                    <td> ${activity.bookings} </td>
                    <td>
                        <form id="bookForm" data-activity-id="${activity.id}">
                        <button type="button" class="btn-primary" 
                            data-activity-id="${activity.id}" 
                            data-exp-name="${activity.exp_name}"
                            data-exp-type="${activity.exp_type}"
                            data-country="${activity.country}"
                            data-region="${activity.region}"
                            data-exp-description="${activity.exp_description}"
                            data-img_url="${activity.img_url}"                        
                            onclick="bookingActivity(event, this)">Book</button>
                    </form>
                    </td>
                `;

                tableBody.appendChild(newRow);
            });
        } else {
            console.log('Search failed');
        }

    } catch (err) {
        console.error(err);
    }
}
