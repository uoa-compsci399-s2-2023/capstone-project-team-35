# Imports
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# List of all uploads images in a single batch
uploaded_images = []

# Creates a Flask app instance
api = Flask(__name__)

# Enable Cross-Origin Resource Sharing to allow requests from different routes/servers
CORS(api)

# Get the directory path of the current script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the directory path for the "Images" folder
images_directory = os.path.join(current_directory, 'Images')

# Create the "Images" directory if it doesn't exist (It should always exist tho, this is here to avoid errors if it is accidently deleted)
if not os.path.exists(images_directory):
    os.makedirs(images_directory)

# Endpoint to handle image upload - bacth image upload doesn't work atm but I think it's due to an issue on the front-end
@api.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']  # Get the uploaded image from the front-end form
        image_filename = os.path.join(images_directory, image.filename)  # Creates the path the image will be saved to
        image.save(image_filename)  # Save the uploaded image to the specified path
        uploaded_images.append(image_filename)  
        return 'Image uploaded successfully!', 200
    else:
        return 'No image provided', 400

# Endpoint to get a list of uploaded images for the front-end
@api.route('/get_images', methods=['GET'])
def get_images():
    return jsonify(uploaded_images) 

# Endpoint to clear the list of uploaded images - this is to be called whenever images are uploaded so that the lost only contains images from that bach. 
# (can be removed later on if we go a different direction, and can be improved to remove images from the 'Images' directory as well)
@api.route('/clear_images', methods=['POST'])
def clear_images():
    global uploaded_images
    uploaded_images = []  # Clear the list of uploaded images
    return 'Uploaded images cleared', 200

# Run the app only if this script is executed directly 
if __name__ == '__main__':
    api.run(debug=True)  # Start the Flask app with debugging enabled