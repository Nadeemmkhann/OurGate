# from flask import *
# from flask_cors import CORS

# app = Flask(__name__)
# cors = CORS(app)

# # @app.route('/')
# # def customer():
# #     return render_template('signup.html')


# @app.route('/addUser', methods=['POST', 'GET'])
# def print_data():
#     if request.method == 'POST':
#         user = request.json
#         print(user)
#         # Call DB to add user
#         return user

from flask import Flask, request, jsonify
from flask_cors import CORS
from db import database
# Set up Flaskstrong>:
app = Flask(__name__)
# Set up Flask to bypass CORSstrong>:
cors = CORS(app)
# Create the receiver API POST endpoint:


@app.route("/receiver", methods=["POST"])
def postME():
    data = request.get_json()
    data = jsonify(data)
    database(data)
    print(data)
    return data


if __name__ == "__main__":
    app.run(debug=False)


if __name__ == '__main__':
    app.run(debug=False)
