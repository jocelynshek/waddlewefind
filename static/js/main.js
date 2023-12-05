let selectedCategory = null;

// Function to toggle the star status
function toggleStar(penguinId, isStarred) {
    fetch('/toggle-star', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            penguinId: penguinId,
            isStarred: isStarred
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            const starButton = document.querySelector(`[data-penguin-id="${penguinId}"]`);
            starButton.innerHTML = isStarred ? '★' : '☆';
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = determineCurrentPage();
    if (currentPage === '/search.html'){
    // This code will run whenever the selected option in the dropdown menu changes
    document.getElementById('category-dropdown').addEventListener('change', function() {
        var optionsDropdown = document.getElementById('options-dropdown');

        optionsDropdown.innerHTML = '<option value="" disabled selected>Select an Option</option>';
        optionsDropdown.disabled = false; // Enable the option dropdown if it was disabled

        // Get the value of the selected option
        selectedCategory = this.value;

        // selectedCategory makes a request to  server
        fetch('/get-options?category=' + selectedCategory)
        .then(response => response.json())
        .then(data => {

        var dropdown = document.getElementById('options-dropdown');
        dropdown.disabled = false; // Enable the dropdown

        // Sort the data numerically if the category is 'age'
        if (selectedCategory === 'Age') {
            data.sort((a, b) => parseInt(a[selectedCategory]) - parseInt(b[selectedCategory]));
        }

        else {
            // Alphabetical sorting for other categories
            data.sort((a, b) => a[selectedCategory].localeCompare(b[selectedCategory]));
        }

        data.forEach(option => {

            var newOption = document.createElement('option');
            var optionValue = option[selectedCategory];
            newOption.value = optionValue;
            newOption.textContent = optionValue;
            dropdown.appendChild(newOption);
        });        
    });
});

document.getElementById('options-dropdown').addEventListener('change', function() {
    resetTable();
    // This line disables the placeholder after a valid selection is made
    this.options[0].disabled = true;
    var selectedOption = this.value; // Get the value of the selected option

    // You can now use selectedCategory to do something, like making a request to your server
    fetch('/get-penguins?category=' + selectedCategory + '&option=' + selectedOption)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('penguins-table').querySelector('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = row.Name;
                tr.appendChild(nameCell);
                
                const speciesCell = document.createElement('td');
                speciesCell.textContent = row.Species;
                tr.appendChild(speciesCell);
            
                const originCell = document.createElement('td');
                originCell.textContent = row.Origin;
                tr.appendChild(originCell);
                
                const locationCell = document.createElement('td');
                locationCell.textContent = row.Location;
                tr.appendChild(locationCell);

                const sexCell = document.createElement('td');
                sexCell.textContent = row.Sex;
                tr.appendChild(sexCell);
            
                const ageCell = document.createElement('td');
                ageCell.textContent = row.Age;
                tr.appendChild(ageCell);

                const starCell = document.createElement('td');
                const starButton = document.createElement('button');
                starButton.innerHTML = row.is_starred ? '★' : '☆'; // Filled star if is_starred is true, otherwise empty star
                starButton.classList.add('star-button'); // Add class for styling
                starButton.setAttribute('data-penguin-id', row.Name); // Store the penguin's ID
            
                // Event listener for the star button
                starButton.addEventListener('click', function() {
                    // Correctly get the penguin's ID from the star button
                    const penguinId = this.getAttribute('data-penguin-id');
                
                    // Make sure penguinId is defined
                    if (penguinId) {
                        const isStarred = this.innerHTML === '★';
                        toggleStar(penguinId, !isStarred)
                            .then(() => {
                                // Update the star only after the backend has responded successfully
                                this.innerHTML = isStarred ? '☆' : '★';
                            })
                            .catch(error => {
                                console.error('Error toggling star:', error);
                            });
                    } else {
                        console.error('Penguin ID is undefined');
                    }
                });
            
                starCell.appendChild(starButton);
                tr.appendChild(starCell);

                tableBody.appendChild(tr);
            });
        })
    .catch(error => console.error('Error:', error));        
});
    }

    else {
    // Add a click event listener to the "reset" button
    document.getElementById("reset").addEventListener("click", function() {
        console.log('Button was clicked!');
        // Make an AJAX request to reset the game
        fetch('/reset_game', {
            method: 'POST', // Use GET if your route is defined as such
        })
        .then(response => {
            // Handle the response as needed
            if (response.ok) {
                // Reset was successful, redirect to the start page
                window.location.href = '/';
            } else {
                // Handle any error conditions if necessary
                console.error('Reset failed.');
            }
        })
        .catch(error => {
            // Handle any network or other errors
            console.error('Error:', error);
        });
    });
    }
});

function determineCurrentPage() {
    // Get the current page's URL pathname
    const currentPagePath = window.location.pathname;
    
    // Return the pathname to identify the current page
    return currentPagePath;
}