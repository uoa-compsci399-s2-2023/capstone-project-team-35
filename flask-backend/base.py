import os
from flask import Flask, request, jsonify
from flask_cors import CORS
images = []

api = Flask(__name__)
CORS(api)

# Get the directory path of the current script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the directory path for the "Images" folder
images_directory = os.path.join(current_directory, 'Images')

# Create the "Images" directory if it doesn't exist
if not os.path.exists(images_directory):
    os.makedirs(images_directory)

uploaded_images = []
response_body = "This is information recieved from the backend"

@api.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']
        image_filename = os.path.join(images_directory, image.filename)
        image.save(image_filename)
        uploaded_images.append(image_filename)
        return 'Image uploaded successfully!', 200
    else:
        return 'No image provided', 400
    
@api.route('/get_images', methods=['GET'])
def get_images():
    return jsonify(uploaded_images)

@api.route('/clear_images', methods=['POST'])
def clear_images():
    global uploaded_images
    uploaded_images = []
    return 'Uploaded images cleared', 200

if __name__ == '__main__':
    api.run(debug=True)