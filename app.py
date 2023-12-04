from flask import Flask, render_template, request, jsonify, session
from cs50 import SQL
import random

app = Flask(__name__)
app.secret_key = 'secret_key'

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

    print(matchingpenguins)
    return jsonify(matchingpenguins)

@app.route('/toggle-star', methods=['POST'])
def toggle_star():
    penguin_id = request.form.get('penguinId')
    is_starred = request.form.get('isStarred') == 'true'
    
    db.toggle_star(penguin_id, is_starred)  # Function to update the database

    return {'status': 'success'}

@app.route('/check.html')
def check():
    return render_template('check.html')

@app.route('/check_name', methods=['POST'])
def check_name():
    penguin_name = request.form.get('name')
    correct_name = session.get('selected_penguin', {}).get('name', '')
    return jsonify(correct=penguin_name.strip().lower() == correct_name.lower())

if __name__ == '__main__':
    app.run(debug=True)