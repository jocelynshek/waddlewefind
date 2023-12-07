# Waddle We Find?
A Harvard CS50 Final Project made by Jocelyn Shek '27 and Ricardo Fernandes Garcia '27. This is a penguin-themed detective and search game where you are tasked with identifying a penguin using limited information.

This project requires Python Version 3.7+. If not already installed, follow installation instructions at https://www.python.org/downloads/. A virtual environment can be used, but is not required. Install all dependencies listed in the requirements.txt file using the terminal command "pip install -r requirements.txt".

Gameplay instructions: You begin by recieving a letter detailing your new position at a penguin hotel. Go to the computer and click on the various programs to learn more about your guest, with the goal of figuring out their name! Use the encyclopedia and letter to identify the penguin's species, and use the database search to filter penguins by category. You can also star penguins, and check out your starred penguins in the "Starred" program. Once you think you've indentified the name of the penguin, check your guess using the Guess program! If you've correctly identified the penguin for that round, you can play again.

Before running the game, make sure that you have Python installed. If pulling this program from Github, glone the repository to your local device using Git. Run in terminal:
git clone https://github.com/jocelyn-shek/waddlewefind.git
cd waddlewefind

Depending on your device, you may need to install a virtual environment. Again, make sure you have installed dependencies by running "pip install -r requirements.txt". Then, set the Flask environment.
On Windows:
set FLASK_APP=app.py
set FLASK_ENV=development

On MacOS/Linux:
export FLASK_APP=app.py
export FLASK_ENV=development

Then, run the program using "flask run".

Thank you so much to all CS50 staff for a great semester! If you have any questions, comments, or concerns, please reach out at jocelynshek@college.harvard.edu or ricardofernandesgarcia@college.harvard.edu.