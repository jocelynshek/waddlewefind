from flask import Flask, render_template

app = Flask(__name__)

@app.route('/layout')
def layout():
    # Renders the layout template (test)
    return render_template('layout.html')

if __name__ == '__main__':
    app.run(debug=True)

