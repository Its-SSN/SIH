from PIL import Image
import requests
from io import BytesIO
import pytesseract

from article import get_links

pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

def get_from_url(image_url):
    # Request the image from the URL
    response = requests.get(image_url)

    # Read the image using PIL (Python Imaging Library)
    image = Image.open(BytesIO(response.content))

    # Perform OCR on the image
    text = pytesseract.image_to_string(image)

    return text

def epaper_scrapper():
    pass