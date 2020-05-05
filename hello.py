import requests 
import threading
import pandas as pd
import urllib.request
import os
import requests
import json
import re
from PIL import Image
from io import StringIO
import sys


def Reformat_Image(ImageFilePath):
    image = Image.open(ImageFilePath, 'r')
    image_name = image.filename
    image_size = image.size
    width = image_size[0]
    height = image_size[1]

    if(width != height):
        bigside = width if width > height else height

        background = Image.new('RGBA', (bigside, bigside), (255, 255, 255, 255))
        offset = (int(round(((bigside - width) / 2), 0)), int(round(((bigside - height) / 2),0)))

        background.paste(image, offset)
        background.save(image_name, format('PNG'))
        print("Image has been resized !")
        return ImageFilePath

    else:
        print("Image is already a square, it has not been resized !")
        return ImageFilePath


 
return Reformat_Image(sys.argv[1])