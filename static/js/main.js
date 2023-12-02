document.addEventListener('DOMContentLoaded', function() {
    //When button pressed, start game
    function StartGame() {
        // Redirect to letter.html when the button pressed
        window.location.href = "letter.html";
    }

    // Get the button element by its ID
    var startButton = document.getElementById('startButton');

    // Add a click event listener to the button
    startButton.addEventListener('click', StartGame);
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to redirect to computer.html when the button is clicked
    function redirectToComputer() {
        // Redirect to computer.html when the button is clicked
        window.location.href = "computer.html";
    }

    // Get the button element by its ID
    var computerButton = document.getElementById('Computer');

    // Add a click event listener to the button
    computerButton.addEventListener('click', redirectToComputer);
});


function updateOptions() {
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
}

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