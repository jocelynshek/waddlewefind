let selectedCategory = null;

// Function to toggle the star status for a penguin
function toggleStar(penguinId, isStarred) {
    // Sending a POST request to the server
    fetch('/toggle-star', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            penguinId: penguinId, // Sending penguin ID
            isStarred: isStarred // Sending star status
        })
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the star button's appearance based on the toggled state
            const starButton = document.querySelector(`[data-penguin-id="${penguinId}"]`);
            starButton.innerHTML = isStarred ? '★' : '☆';
        })
        .catch(error => {
            // Log any errors to the console
            console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = determineCurrentPage();

    // Check if the current page is the search page
    if (currentPage === '/search.html') {
        // Event listener for changes in the category dropdown
        document.getElementById('category-dropdown').addEventListener('change', function() {
            var optionsDropdown = document.getElementById('options-dropdown');

            // Reset and enable the options dropdown
            optionsDropdown.innerHTML = '<option value="" disabled selected>Select an Option</option>';
            optionsDropdown.disabled = false;

            // Get the value of the selected option
            selectedCategory = this.value;

            // Makes a request to server using selectedCategory
            fetch('/get-options?category=' + selectedCategory)
                .then(response => response.json())
                .then(data => {

                    var dropdown = document.getElementById('options-dropdown');
                    dropdown.disabled = false; // Enable the dropdown

                    if (selectedCategory === 'Age') {
                        // Sort the data numerically if the category is 'age'
                        data.sort((a, b) => parseInt(a[selectedCategory]) - parseInt(b[selectedCategory]));
                    } else {
                        // Alphabetical sorting for other categories
                        data.sort((a, b) => a[selectedCategory].localeCompare(b[selectedCategory]));
                    }

                    // Populate dropdown with sorted data
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
            resetTable(); // Clear existing table data
            // Disables the placeholder after a valid selection is made
            this.options[0].disabled = true;
            var selectedOption = this.value; // Get the value of the selected option
        
            // Fetch data based on the selected category and option
            fetch('/get-penguins?category=' + selectedCategory + '&option=' + selectedOption)
                .then(response => response.json())
                .then(data => {
                    const tableBody = document.getElementById('penguins-table').querySelector('tbody');
                    
                    // Populating table rows with fetched data
                    data.forEach(row => {

                        // Creating and populating cells for each attribute
                        const tr = document.createElement('tr');

                        // Creating and populating cells for each attribute
                        ['Name', 'Species', 'Origin', 'Location', 'Sex', 'Age'].forEach(attr => {
                            const cell = document.createElement('td');
                            cell.textContent = row[attr];
                            tr.appendChild(cell);
                        });
                        
                        // Creating the star button
                        const starCell = document.createElement('td');
                        const starButton = document.createElement('button');
                        starButton.innerHTML = row.is_starred ? '★' : '☆'; // Filled star if is_starred is true, otherwise empty star
                        starButton.classList.add('star-button'); // Add class for styling
                        starButton.setAttribute('data-penguin-id', row.Name); // Store the penguin's ID
        
                        // Event listener for toggling star status
                        starButton.addEventListener('click', function() {
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
                        
                        // Adding the completed row to the table body
                        tableBody.appendChild(tr);
                    });
                })
                .catch(error => console.error('Error:', error));
        });
        }

    else {
    // Click event listener for  "reset" button
    document.getElementById("reset").addEventListener("click", function() {
        // AJAX request to reset the game
        fetch('/reset_game', {
            method: 'POST',
        })
        .then(response => {
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

function resetTable() {
    const tableBody = document.getElementById('penguins-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table
}

function determineCurrentPage() {
    // Get the current page's URL pathname
    const currentPagePath = window.location.pathname;
    
    // Return the pathname to identify the current page
    return currentPagePath;
}