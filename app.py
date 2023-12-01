from flask import Flask, render_template

app = Flask(__name__)

def query_db(query, args=(), one=False):
    """Utility function to query the database."""
    conn = sqlite3.connect('penguins.db')
    cur = conn.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    conn.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/')
def start():
    # Renders the index.html template
    return render_template('start.html')

#@app.route('/letter')
#def letter():

@app.route('/search')
def index():
    """Route to serve the search page."""
    return render_template('search.html')

@app.route('/get_options')
def get_options():
    """Route to get options based on the selected category."""
    category = request.args.get('category')
    query = f"SELECT DISTINCT {category} FROM penguins"
    options = query_db(query)
    return jsonify(options=[o[0] for o in options])

@app.route('/get_penguins')
def get_penguins():
    """Route to get penguins based on the selected category and option."""
    category = request.args.get('category')
    option = request.args.get('option')
    query = f"SELECT * FROM penguins WHERE {category} = ?"
    penguins = query_db(query, [option])
    return jsonify(penguins=[dict(zip(['name', 'species', 'origin', 'location', 'sex', 'age'], p)) for p in penguins])

#@app.route('/check')
#def check():

if __name__ == '__main__':
    app.run(debug=True)