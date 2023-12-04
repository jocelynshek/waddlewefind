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

@app.route('/encyclopedia')
def encyclopedia():
    #Render encyclopedia.html
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

#@app.route('/check')
#def check():

if __name__ == '__main__':
    app.run(debug=True)