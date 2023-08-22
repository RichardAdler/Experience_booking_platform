async function bookingActivity(button) {
const buttonid = button.parentElement.getAttribute('data-activity-id');
try {
    const response = await fetch(`/book/${buttonid}`,
    {method: 'PUT'}
    )
    if(response.ok){
        console.log(`Successfully booked activity`);
    }
    else {
        console.log(`Failed to log.`);
    }
} catch (err) {
    console.error(err);
}
}   

async function search() {
    const search = document.getElementById('search').value;

    try {
        const response = await fetch(`/search/${search}`);
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
                    <td> ${activity.lon} </td>
                    <td> ${activity.lat} </td>
                    <td> ${activity.exp_description} </td>
                    <td> ${activity.bookings} </td>
                    <td>
                        <form id="bookForm" data-activity-id="${activity.id} ">
                            <button type="submit" onclick="bookingActivity(this)" class="btn-primary">Book</button>
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