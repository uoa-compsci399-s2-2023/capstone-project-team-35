from flask import Blueprint, request
import app.upload.services as services
import app.adapters.repository as repo

upload_blueprint = Blueprint('upload_and_get_classifications_bp', __name__)

# Endpoint to handle image upload
@upload_blueprint.route('/classify', methods=['POST'])
def upload_and_get_classifications():
    print(request.files)
    if 'image' in request.files:
        image = request.files['image']  # Get the uploaded image from the front-end form
        services.store_user_uploaded_image(image, repo.repo_instance)
        return 'Image uploaded successfully!', 200
    else:
        return 'No image provided', 400