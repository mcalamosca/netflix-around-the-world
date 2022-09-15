from distutils.log import error
import os, sys
import json

from flask import Flask, jsonify, render_template

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route("/api/media/netflix", methods=["GET"])
def media():
    jsonFile = json.loads(open(os.path.join(sys.path[0],"db.json"), 'r', encoding='utf-8',errors='ignore').read())
    return jsonify(jsonFile['netflix'])

@app.route("/", methods=["GET"])
def root():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))