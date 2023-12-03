document.addEventListener('DOMContentLoaded', function() {
    // This code will run whenever the selected option in the dropdown menu changes
    document.getElementById('category-dropdown').addEventListener('change', function() {
        this.options[0].disabled = true;
        var selectedCategory = this.value; // Get the value of the selected option
        // You can now use selectedCategory to do something, like making a request to your server
        fetch('/get-options?category=' + selectedCategory)
        .then(response => response.json())
        .then(data => {

        var dropdown = document.getElementById('options-dropdown'); // Replace with your dropdown's id
        dropdown.innerHTML = ''; // Clear any existing options
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
});