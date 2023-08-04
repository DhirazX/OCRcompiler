# from PIL import Image
import cv2 
import functions as f
import pytesseract as py
import os

def run(image_Name):
    img_folder = "Images"
    img_path = os.path.join(img_folder, image_Name)
    img = cv2.imread(img_path)

    #Image processing
    img_bw = f.img_Processing(img)
    
    #Edge Detection
    edged=cv2.Canny(img_bw,10,50)

    #Contures detection and Prespective transformation
    image_output  = f.contures_detection(edged,img)
    
    #OCR section 
    ocr_img = f.img_Processing(image_output)
    ocr_text=py.image_to_string(ocr_img)
    
    #testing
    # cv2.imshow("test",f.rescaleFrame(img_bw))
    # cv2.waitKey(0)
    data={
        'ocr':ocr_text,
        'NA':'test'
    }
    return data





