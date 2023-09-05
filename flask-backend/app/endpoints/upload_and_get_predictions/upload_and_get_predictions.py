from flask import Blueprint, request
import app.endpoints.upload_and_get_predictions.services as services
import app.storage.abstractrepository as repo
import json

upload_blueprint = Blueprint('upload_and_get_classifications_bp', __name__)

@upload_blueprint.route('/classify', methods=['POST'])
def upload_and_get_classifications():
    insect_type = "trupanea" #TODO: get this from frontend
    model_type = None        #TODO: could also add model selection to frontend
    
    if 'image' in request.files:
        target_image = request.files['image']
        target_image_list = [target_image]
        species_probability_dict = services.get_predictions(target_image_list, insect_type, model_type, repo.repo_instance)   #TODO: enable upload of multiple images
        json_serializable_return_dict = {key: str(value) for key, value in species_probability_dict.items()}
        json_output = json.dumps(json_serializable_return_dict)
        return json_output, 200
    else:
        return 'No image provided', 400