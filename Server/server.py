from flask import Flask
import main as m

app = Flask(__name__)

@app.route("/ocr")
def ocr():
    return m.ocr_text

if __name__ == "__main__":
    app.run(debug=True)
