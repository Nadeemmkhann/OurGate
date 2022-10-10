import sqlite3

con = sqlite3.connect("ourGate.db")
cur = con.cursor()
cur.execute("select * from user")
print(cur.fetchall())
