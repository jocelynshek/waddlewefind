from flask import Flask, render_template, request, jsonify
from cs50 import SQL

app = Flask(__name__)

db = SQL("sqlite:///penguins.db")

@app.route('/')
def start():
    # Renders the index.html template
    return render_template('start.html')

@app.route('/letter.html')
def letter():
    # Renders letter.html page
    return render_template('letter.html')

@app.route('/computer.html')
def computer():
    # Render computer.html page
    return render_template('computer.html')



@app.route('/search.html')
def search():
    #Route to serve the search page.
    #rows = db.execute("SELECT cash FROM users WHERE id = :id", id=session["user_id"])
    #if not rows:
        #return apology("missing user")
    # Query the database for the first dropdown data
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



"""@app.route('/get_options')
def get_options():
    category = request.args.get('category')
    # Query the database based on the selected category
    options = db.execute("SELECT option FROM penguins WHERE category = ?", [category])
    
    # Return the options as JSON
    return jsonify([o[0] for o in options])"""




"""@app.route('/get_options')
def getOptions():
    #Route to get options based on the selected category.
    category = request.args.get('category')

    valid_categories = ['Species', 'Origin', 'Location', 'Sex', 'Age']  # Update with your actual column names
    if category not in valid_categories:
        return jsonify({"error": "Invalid category"}), 400

    query = f"SELECT DISTINCT {category} FROM penguins"


    options = query_db(query)
    return jsonify(options=[o[0] for o in options])

@app.route('/get_penguins')
def get_penguins():
    #Route to get penguins based on the selected category and option.
    category = request.args.get('category')
    option = request.args.get('option')
    query = f"SELECT * FROM penguins WHERE {category} = ?"
    penguins = query_db(query, [option])
    return jsonify(penguins=[dict(zip(['name', 'species', 'origin', 'location', 'sex', 'age'], p)) for p in penguins])"""

#@app.route('/check')
#def check():

if __name__ == '__main__':
    app.run(debug=True)