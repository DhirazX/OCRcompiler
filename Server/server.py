from flask import Flask ,request
import main as m
import json

app = Flask(__name__)

@app.route("/ocr")
def ocr():
    a=json.dumps(m.data)
    return a

@app.route('/py', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image in th request",400
    
    image = request.files['image']
    image.save('Images/image.jpg')
    return "Image uploaded successfully",200


if __name__ == "__main__":
    app.run(debug=True)
