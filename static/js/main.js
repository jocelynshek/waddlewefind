document.addEventListener('DOMContentLoaded', function() {
    
    // Function starting game when Enter key pressed
    function startGameOnEnter(event) {
        if (event.key === "Enter") {
            // Redirect to letter html starting game
            window.location.href = "letter.html";
        }

    }

    // Event listener for the Start button click
    document.addEventListener('keydown', startGameOnEnter);
});
