from distutils.log import error
import os
import json

from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/netflix", methods=["GET"])
def media():
    jsonFile = json.loads(open("flaskapi\db.json", 'r', encoding='utf-8',errors='ignore').read())
    return jsonify(jsonFile['netflix'])

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))