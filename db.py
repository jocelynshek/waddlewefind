import pandas as pd
import sqlite3

# Read CSV file
df = pd.read_csv('penguin_info.csv')

# Connect to SQLite DB
conn = sqlite3.connect('penguins.db')
df.to_sql('penguins', conn, if_exists='replace', index=False)
conn.close()