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
        results = services.get_predictions(target_image_list, insect_type, model_type, repo.repo_instance)   #TODO: enable upload of multiple images
        
        for prediction in results:
            print(prediction.label_probability_dict)
            print(prediction.input_image_path)
            
        # Initialize a list to store prediction data
        aggregated_predictions = []

        # Loop through the results and store prediction data
        for prediction in results:
            json_serializable_label_probability_dict = {key: str(value) for key, value in prediction.label_probability_dict.items()}
            prediction_data = {
                'labels': json_serializable_label_probability_dict,
                'input_image_path': prediction.input_image_path
            }
            aggregated_predictions.append(prediction_data)

        return aggregated_predictions, 200
    else:
        return 'No image provided', 400