# from PIL import Image
import cv2 
import functions as f
import pytesseract as py

img_path = "Images/test4.jpg"
img = cv2.imread(img_path)


#Grayscale

gray_img=f.grayscale(img)

#Binarization

thresh,img_bw = cv2.threshold(gray_img,100,210,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

#Noise Removal

noiserem_img = f.noise_removal(img_bw)


#add thickenss 

thick=f.thick_font(noiserem_img)

#extend broder

add= f.make_borders(thick)

#extrecting text

ocr_text=py.image_to_string(add)

data={
    'ocr':ocr_text,
    'hehe':'haha',
    'lol':'nop'
}


#extend boarder

# add1=cv2.imread("temp/add.jpg")
# removed=f.remove_borders(add1)
# cv2.imwrite("Temp/removedb_image.jpg",removed)





