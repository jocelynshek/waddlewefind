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
    return render_template('start.html')

# Predefined gameplay options
gameoptions = [
    {'name':'Bee', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '20+', 'image': 'resources/PAfrican.png'},
    {'name':'Barrel', 'species': '???', 'origin': 'Subantarctic islands', 'location': '???', 'sex': 'M', 'age': '2', 'image': 'resources/PGentoo.png'},
    {'name':'Egg', 'species': '???', 'origin': '???', 'location': 'SEA LIFE Melbourne', 'sex': 'F', 'age': '???', 'image': 'resources/PKing_.png'},
    {'name':'Cecilia', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '???', 'image': 'resources/PMagellanic.png'}
]

def get_random():
    if 'selected_penguin' not in session:
        session['selected_penguin'] = random.choice(gameoptions)
    return session['selected_penguin']

@app.route('/letter.html')
def letter():
    return render_template('letter.html', **get_random())

@app.route('/computer.html')
def computer():
    return render_template('computer.html')

@app.route('/encyclopedia.html')
def encyclopedia():
    return render_template('encyclopedia.html')

@app.route('/search.html')
def search():
    categories = ["Species", "Origin", "Location", "Sex", "Age"]

    return render_template('search.html', categories=categories)

@app.route('/get-options')
def get_options():
    category = request.args.get('category')
    options = db.execute("SELECT DISTINCT " + category + " FROM penguins")
    print(options)
    return jsonify(options)

@app.route('/get-penguins')
def get_penguins():
    category = request.args.get('category')
    option = request.args.get('option')

    valid_categories = ['Species', 'Origin', 'Location', 'Sex', 'Age'] 
    # Validate the category
    if category not in valid_categories:
        return jsonify({'error': 'Invalid category'}), 400
    
    query = f"SELECT * FROM penguins WHERE {category} = ?"
    matchingpenguins = db.execute(query, option)

    return jsonify(matchingpenguins)

@app.route('/toggle-star', methods=['POST'])
def toggle_star():
    data = request.get_json()
    penguin_id = data.get('penguinId')
    is_starred = data.get('isStarred')

    if penguin_id is not None:
        is_starred = 1 if is_starred else 0

        db_module.toggle_star(penguin_id, is_starred)

        return jsonify({'status': 'success'})
    else:
        return jsonify({'error': 'Invalid penguin ID'}), 400

@app.route('/starred.html')
def starred():
    starred_penguins = db.execute("SELECT * FROM penguins WHERE is_starred = TRUE")
    return render_template('starred.html', starred_penguins=starred_penguins)

@app.route('/check.html')
def check():
    return render_template('check.html')

@app.route('/check_name', methods=['POST'])
def check_name():
    penguin_name = request.form.get('name')
    correct_name = session.get('selected_penguin', {}).get('name', '')
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