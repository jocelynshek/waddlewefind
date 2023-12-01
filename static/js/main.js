document.addEventListener('DOMContentLoaded', function() {
    const titleScreen = document.getElementById('title-screen');
    const startButton = document.getElementById('start-button');

    // Function to handle starting the game
    function startGame() {
        // You can add code here to start your game:
        // For example, hide the title screen and show the game section
        titleScreen.style.display = 'none';
        // Example: document.getElementById('game-section').style.display = 'block';
        
        // Additional game initialization code can be added here
        // ...
    }

    // Event listener for the Start button click
    startButton.addEventListener('click', startGame);
});
