from flask import Flask,request
import main as m
import json
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image in th request",400
    image = request.files['image']
    image.save('Images/image.jpg')
    return "Image uploaded successfully",200

@app.route("/ocr")
def ocr():
    data=m.process()
    a=json.dumps(data)
    return a

if __name__ == "__main__":
    app.run(debug=True)
