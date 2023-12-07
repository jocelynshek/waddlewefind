from flask import Flask, render_template, request, jsonify, session, redirect
from cs50 import SQL
import random
import sqlite3
import db as db_module

app = Flask(__name__)
app.secret_key = 'secret_key'

db_module.initialize_database()
db = SQL("sqlite:///penguins.db")

@app.route('/')
def start():
    if 'selected_penguin' in session:
        del session['selected_penguin']
    return render_template('start.html')

# Predefined gameplay options
gameoptions = [
    {'name':'Bee', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '20+', 'image': 'resources/PAfrican.png'},
    {'name':'Barrel', 'species': '???', 'origin': 'Subantarctic islands', 'location': '???', 'sex': 'M', 'age': '2', 'image': 'resources/PGentoo.png'},
    {'name':'Egg', 'species': '???', 'origin': '???', 'location': 'SEA LIFE Melbourne', 'sex': 'F', 'age': '???', 'image': 'resources/PKing_.png'},
    {'name':'Cecilia', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '???', 'image': 'resources/PMagellanic.png'},
    {'name':'DeHoop', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'M', 'age': '10+', 'image': 'resources/PHumboldt.png'}
]

# Function to randomize penguin
def get_random():
    if 'selected_penguin' not in session:
        session['selected_penguin'] = random.choice(gameoptions)
    return session['selected_penguin']

@app.route('/letter.html')
def letter():
    return render_template('letter.html', **get_random())

@app.route('/computer.html')
def computer():
    current_file = request.path
    return render_template('computer.html', current_file = current_file)

@app.route('/encyclopedia.html')
def encyclopedia():
    return render_template('encyclopedia.html')

@app.route('/search.html')
def search():
    categories = ["Species", "Origin", "Location", "Sex", "Age"]
    return render_template('search.html', categories=categories)

# Used for /search.html: updates second dropdown
@app.route('/get-options')
def get_options():
    # Get category, SQL query, and return options
    category = request.args.get('category')
    options = db.execute("SELECT DISTINCT " + category + " FROM penguins")
    return jsonify(options)

# Used for /search.html: updates penguin results when category and option are selected
@app.route('/get-penguins')
def get_penguins():
    category = request.args.get('category')
    option = request.args.get('option')

    valid_categories = ['Species', 'Origin', 'Location', 'Sex', 'Age'] 
    # Validate the category
    if category not in valid_categories:
        return jsonify({'error': 'Invalid category'}), 400
    
    # Query and return penguins that match category and option
    query = f"SELECT * FROM penguins WHERE {category} = ?"
    matchingpenguins = db.execute(query, option)

    return jsonify(matchingpenguins)

# Used for /search.html: toggle star
@app.route('/toggle-star', methods=['POST'])
def toggle_star():
    # Retrieve JSON data from the incoming request
    data = request.get_json()
    penguin_id = data.get('penguinId')
    is_starred = data.get('isStarred')

    if penguin_id is not None:
        # Convert the boolean 'isStarred' value to an integer (1 for True, 0 for False)
        is_starred = 1 if is_starred else 0

        # Call function to toggle the star status in the database
        db_module.toggle_star(penguin_id, is_starred)
        return jsonify({'status': 'success'})
    
    else:
        return jsonify({'error': 'Invalid penguin ID'}), 400

@app.route('/starred.html')
def starred():
    # Queries starred penguins
    starred_penguins = db.execute("SELECT * FROM penguins WHERE is_starred = TRUE")
    return render_template('starred.html', starred_penguins=starred_penguins)

@app.route('/check.html')
def check():
    return render_template('check.html')

# Used for /check.html: check if name is correct
@app.route('/check_name', methods=['POST'])
def check_name():
    # Get name that the user entered in form
    penguin_name = request.form.get('name')

    # Get the randomized penguin's name for the session
    correct_name = session.get('selected_penguin', {}).get('name', '')

    # Check/return whether the names are the same (lowercase, no whitespace)
    return jsonify(correct=penguin_name.strip().lower() == correct_name.lower())

@app.route('/gameover.html')
def game_over():
    return render_template('gameover.html')

@app.route('/reset_game', methods=['POST'])
def reset_game():
    # Clear the selected_penguin from the session
    if 'selected_penguin' in session:
        del session['selected_penguin']
    # Redirect to the start page
    db_module.reset_starred()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)