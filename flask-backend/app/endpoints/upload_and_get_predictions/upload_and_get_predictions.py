from flask import Blueprint, request
import app.endpoints.upload_and_get_predictions.services as services
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import json

upload_blueprint = Blueprint('upload_and_get_classifications_bp', __name__)

@upload_blueprint.route('/classify/<insect_type>', methods=['POST'])
def upload_and_get_classifications(insect_type=None):
    if insect_type is None:
        insect_type = "trupanea" #TODO: de-hardcode
    model_type = None        #TODO: could also add model selection to frontend
    
    target_image_list = []
    if len(request.files) > 0:
        print("hey", len(request.files))
        for img in request.files:
            target_image_list.append(request.files[img])
        
        results = services.get_predictions(target_image_list, insect_type, model_type, repo.repo_instance)   #TODO: enable upload of multiple images
            
        # Initialize a list to store prediction data
        aggregated_predictions = []

        # Loop through the results and store prediction data
        for result in results:
            prediction = {}
            prediction["input_image_path"] = result.input_image_path
            prediction["predictions"] = {}
            label_probability_dict = result.label_probability_dict
            count = 0
            for label in label_probability_dict:
                insect = utils.get_insect_by_label(globals.DEFAULT_INSECT_SUPERTYPE, label)
                prediction["predictions"][count] = {
                    "label": insect.label,
                    "probability": str(round(label_probability_dict[label], 3)),
                    "genus": insect.genus,
                    "species": insect.species,
                    "country": insect.country,
                    "image_file_path": str(insect.image_file_path), #TODO: return actual image instead of file? 
                }
                count = count + 1
            aggregated_predictions.append(prediction)

        return aggregated_predictions, 200
    else:
        return 'No image provided', 400