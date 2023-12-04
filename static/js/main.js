let selectedCategory = null;

document.addEventListener('DOMContentLoaded', function() {
    resetTable();
    // This code will run whenever the selected option in the dropdown menu changes
    document.getElementById('category-dropdown').addEventListener('change', function() {
        var optionsDropdown = document.getElementById('options-dropdown');

        optionsDropdown.innerHTML = '<option value="" disabled selected>Select an Option</option>';
        optionsDropdown.disabled = false; // Enable the dropdown if it was disabled


        /*this.options[0].disabled = true;
        selectedCategory = this.value;*/ // Get the value of the selected option
        
        selectedCategory = this.value;
        // You can now use selectedCategory to do something, like making a request to your server
        fetch('/get-options?category=' + selectedCategory)
        .then(response => response.json())
        .then(data => {

        var dropdown = document.getElementById('options-dropdown'); // Replace with your dropdown's id
        //dropdown.innerHTML = ''; Clear any existing options
        dropdown.disabled = false; // Enable the dropdown

        // Sort the data if the category is 'age'
        if (selectedCategory === 'Age') {
            data.sort((a, b) => parseInt(a[selectedCategory]) - parseInt(b[selectedCategory]));
        }

        else {
            // Alphabetical sorting for other categories
            data.sort((a, b) => a[selectedCategory].localeCompare(b[selectedCategory]));
        }

        data.forEach(option => {

            var newOption = document.createElement('option');
            // Assuming each option is a dictionary with a single key-value pair
            var optionValue = option[selectedCategory];
            newOption.value = optionValue;
            newOption.textContent = optionValue;
            dropdown.appendChild(newOption);
        });        
    });
});

document.getElementById('options-dropdown').addEventListener('change', function() {
    resetTable();
    //this.options[0].disabled = true;
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
                /*Object.values(row).forEach(text => {
                    const td = document.createElement('td');
                    td.textContent = text;
                    tr.appendChild(td);
                });*/
                const nameCell = document.createElement('td');
                nameCell.textContent = row.Name; // or row['Name']
                tr.appendChild(nameCell);
                
                const speciesCell = document.createElement('td');
                speciesCell.textContent = row.Species; // or row['Name']
                tr.appendChild(speciesCell);
            
                const originCell = document.createElement('td');
                originCell.textContent = row.Origin; // or row['Age']
                tr.appendChild(originCell);
                
                const locationCell = document.createElement('td');
                locationCell.textContent = row.Location; // or row['Name']
                tr.appendChild(locationCell);

                const sexCell = document.createElement('td');
                sexCell.textContent = row.Sex; // or row['Sex']
                tr.appendChild(sexCell);
            
                const ageCell = document.createElement('td');
                ageCell.textContent = row.Age; // or row['Age']
                tr.appendChild(ageCell);

                tableBody.appendChild(tr);
            });
        })
    .catch(error => console.error('Error:', error));        
});
});

function resetTable() {
    const tableBody = document.getElementById('penguins-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table
}