from asyncio import create_task
import sqlite3
from venv import create

connection = sqlite3.connect('ourGate.db')
cur = connection.cursor()
create_table = """ CREATE TABLE login (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName VARCHAR(25) NOT NULL,
            lastName CHAR(25) NOT NULL,
            wing CHAR(25),
            flat CHAR(25),
            address CHAR(100),
            email CHAR(50),
            password CHAR(25),
            PhoneNumber CHAR(25),
            gender CHAR(25)); """

cur.execute(create_table)
print("Table created successfully")
connection.close()
