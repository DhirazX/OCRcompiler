import os
from flask import Flask, request, redirect
import main as m
import json
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'Images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
           
@app.route('/image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image in th request",400
    
    image = request.files['image']
    
    if image.filename == '':
        return "No image in th request",400
        
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "Image uploaded successfully",200

# @app.route('/result')
# def get_image():
    
@app.route('/ocr')
def ocr():
    data=m.run()
    a=json.dumps(data)
    return a

if __name__ == "__main__":
    app.run(debug=True)
