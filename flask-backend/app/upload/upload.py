from flask import Blueprint, request
import app.upload.services as services

upload_blueprint = Blueprint('upload_bp', __name__)

# Endpoint to handle image upload
@upload_blueprint.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']  # Get the uploaded image from the front-end form
        services.store_user_uploaded_image(image)
        return 'Image uploaded successfully!', 200
    else:
        return 'No image provided', 400