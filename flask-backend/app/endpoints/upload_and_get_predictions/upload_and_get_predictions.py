from flask import Blueprint, request
import app.upload_and_get_predictions.services as services
import app.adapters.repository as repo

upload_blueprint = Blueprint('upload_and_get_classifications_bp', __name__)

@upload_blueprint.route('/classify', methods=['POST'])
def upload_and_get_classifications():
    if 'image' in request.files:
        target_image = request.files['image']  # Get the uploaded image from the front-end form
        # services.store_user_uploaded_image(image, repo.repo_instance)
            # classifier = new models.InsectIdentificationModel()
            # results = classifier.predict(image)
            # return results
        return 'Image uploaded successfully!', 200
    else:
        return 'No image provided', 400