import os
from flask import Flask, request, send_file
import img_process as m
import json
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import mimetypes

UPLOAD_FOLDER = 'Images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
image_Name = None
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
    global image_Name 
    if 'image' not in request.files:
        return "No image in th request",400
    
    image = request.files['image']
    if image.filename == '':
        return "No image in th request",400
        
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_Name=filename
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "Image uploaded successfully",200
    
@app.route('/ocr')
def ocr():
    data=m.run(image_Name)
    a=json.dumps(data)
    return a

@app.route('/pimage')
def get_image():
    global image_Name
    
    saved_folder = "processed_img"
    image_path=os.path.join(saved_folder, image_Name)
    
    mime_type, _ = mimetypes.guess_type(image_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'
        
    return send_file(image_path, mimetype=mime_type)

if __name__ == "__main__":
    app.run(debug=True)
