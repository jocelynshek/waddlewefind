import pandas as pd
import sqlite3

# Read CSV file
df = pd.read_csv('penguin_info.csv')

# Connect to SQLite DB
conn = sqlite3.connect('penguins.db')
df.to_sql('penguins', conn, if_exists='replace', index=False)
conn.close()

@app.route('/search')
def search_penguins():
    query = request.args.get('query')
    conn = sqlite3.connect('penguins.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM penguins WHERE species LIKE ?", ('%' + query + '%',))
    results = cursor.fetchall()
    conn.close()
    return jsonify(results)
