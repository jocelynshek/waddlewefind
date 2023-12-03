//document.addEventListener('DOMContentLoaded', function() {

document.getElementById('category-dropdown').addEventListener('change', function() {
    // This code will run whenever the selected option in the dropdown menu changes
    console.log("hi")
    var selectedCategory = this.value; // Get the value of the selected option
    // You can now use selectedCategory to do something, like making a request to your server
    fetch('/get-options?category=' + selectedCategory)
    .then(response => response.json())
    .then(data => {

        var dropdown = document.getElementById('options-dropdown'); // Replace with your dropdown's id
        dropdown.innerHTML = ''; // Clear any existing options
        dropdown.disabled = false; // Enable the dropdown

        data.forEach(option => {
            var newOption = document.createElement('option');
            var optionValue = item[selectedCategory]; // Get the value using selectedCategory as key
            newOption.value = optionValue;
            newOption.textContent = optionValue;
            dropdown.appendChild(newOption);
        });

    });
});

/*var categoryOption = {
    "Species": {
      "HTML": ["Links", "Images", "Tables", "Lists"],
      "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
      "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Origin": {
      "PHP": ["Variables", "Strings", "Arrays"],
      "SQL": ["SELECT", "UPDATE", "DELETE"]
    },
    "Location": {
        "HTML": ["Links", "Images", "Tables", "Lists"],
        "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
        "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Sex": {
        "PHP": ["Variables", "Strings", "Arrays"],
        "SQL": ["SELECT", "UPDATE", "DELETE"]
    },
    "Age": {
        "HTML": ["Links", "Images", "Tables", "Lists"],
        "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
        "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    }




    "Species": ["African Penguin", "Southern Rockhopper Penguin", "Macaroni Penguin", "Gentoo Penguin", "King Penguin", "Magellanic Penguin", "Humboldt Penguin", "Chinstrap Penguin"],
    "Origin": ["Southern Africa", "Circumpolar distribution", "Antarctica", "Subantarctic islands", "South America", "Humboldt Current"],
    "Location": ["New England Aquarium", "Tennessee Aquarium", "Monterey Bay Aquarium", "SEA LIFE Melbourne", "San Francisco Zoo", "Rosamond Gifford Zoo", "Edinburgh Zoo", "NYC Central Park Zoo"],
    "Sex": ["M", "F"],
    "Age": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
  }
  window.onload = function() {
    var categorySel = document.getElementById("category");
    var optionSel = document.getElementById("option");
    for (var x in categoryOption) {
      categorySel.options[categorySel.options.length] = new Option(x, x);
    }
    categorySel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      optionSel.length = 1;
      //display correct values
      for (var y in categoryOption[this.value]) {
        optionSel.options[optionSel.options.length] = new Option(y, y);
      }
    }
  }*/

  


/*document.getElementById('category-select').addEventListener('change', function() {
    var selectedCategory = this.value;
    fetch(`/getOptions?category=${encodeURIComponent(selectedCategory)}`)
        .then(response => response.json())
        .then(data => {
            var optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = ''; // Clear previous options
            data.options.forEach(option => {
                // Display options as a list
                optionsContainer.innerHTML += `<li>${option}</li>`;
            });
        })
        .catch(error => console.error('Error:', error));
});*/


/*function updateOptions() {
    var category = document.getElementById('category-select').value;
    fetch('/get_options?category=' + category)
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('option-select');
            select.innerHTML = '<option value="">--Please choose an option--</option>';
            data.options.forEach(option => {
                select.innerHTML += `<option value="${option}">${option}</option>`;
            });
        });
}*/

function getPenguins() {
    var category = document.getElementById('category-select').value;
    var option = document.getElementById('option-select').value;
    fetch('/get_penguins?category=' + category + '&option=' + option)
        .then(response => response.json())
        .then(data => {
            var results = document.getElementById('results');
            results.innerHTML = '';
            data.penguins.forEach(penguin => {
                results.innerHTML += `<p>${penguin}</p>`;
            });
        });
}
//});