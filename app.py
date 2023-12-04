from flask import Flask, render_template, request, jsonify, session
from cs50 import SQL
import random

app = Flask(__name__)
app.secret_key = 'secret_key'

db = SQL("sqlite:///penguins.db")

@app.route('/')
def start():
    # Renders the index.html template
    return render_template('start.html')

# Predefined gameplay options
gameoptions = [
    {'name':'Bee', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '20+', 'image': 'resources/PAfrican.png'},
    {'name':'Barrel', 'species': '???', 'origin': 'Subantarctic islands', 'location': '???', 'sex': 'M', 'age': '2', 'image': 'resources/PGentoo.png'},
    {'name':'Egg', 'species': '???', 'origin': '???', 'location': 'SEA LIFE Melbourne', 'sex': 'F', 'age': '???', 'image': 'resources/PKing_.png'},
    {'name':'Cecilia', 'species': '???', 'origin': '???', 'location': '???', 'sex': 'F', 'age': '???', 'image': 'resources/PMagellanic.png'}
    # ... other combinations
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
    # Render computer.html page
    return render_template('computer.html')

@app.route('/encyclopedia.html')
def encyclopedia():
    # Render encyclopedia.html page
    return render_template('encyclopedia.html')

@app.route('/search.html')
def search():
    categories = ["Species", "Origin", "Location", "Sex", "Age"]
    
    # Render the template with the categories data
    return render_template('search.html', categories=categories)

@app.route('/get-options')
def get_options():
    category = request.args.get('category')
    print("SELECT DISTINCT " + category + " FROM penguins")
    options = db.execute("SELECT DISTINCT " + category + " FROM penguins")
    print(options)
    return jsonify(options)

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