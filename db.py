import pandas as pd
import sqlite3

# Read CSV file
df = pd.read_csv('penguin_info.csv')

def initialize_database():
    # Connect to SQLite DB
    conn = sqlite3.connect('penguins.db')
    df.to_sql('penguins', conn, if_exists='replace', index=False)
    cur = conn.cursor()
    cur.execute('ALTER TABLE penguins ADD COLUMN is_starred BOOLEAN DEFAULT FALSE')
    conn.commit()
    conn.close()

#initialize_database()

def toggle_star(penguin_id, is_starred):
    conn = sqlite3.connect('penguins.db')
    cur = conn.cursor()
    cur.execute('UPDATE penguins SET is_starred = ? WHERE Name = ?', (is_starred, penguin_id))
    conn.commit()
    conn.close()

def reset_starred():
    conn = sqlite3.connect('penguins.db')
    cur = conn.cursor()
    cur.execute('UPDATE penguins SET is_starred = FALSE')
    conn.commit()
    conn.close()
