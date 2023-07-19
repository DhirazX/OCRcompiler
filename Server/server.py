from flask import Flask
import main as m
import json

app = Flask(__name__)

@app.route("/ocr")
def ocr():
    a=json.dumps(m.data)
    return a

if __name__ == "__main__":
    app.run(debug=True)
