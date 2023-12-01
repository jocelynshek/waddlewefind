document.addEventListener('DOMContentLoaded', function() {
    
    // Function starting game when Enter key pressed
    function startGameOnEnter(event) {
        if (event.key === "Enter") {
            // Redirect to letter html starting game
            //window.location.href = "letter.html";
            window.location.href = "search.html";
        }

    }

    // Event listener for the Start button click
    document.addEventListener('keydown', startGameOnEnter);
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