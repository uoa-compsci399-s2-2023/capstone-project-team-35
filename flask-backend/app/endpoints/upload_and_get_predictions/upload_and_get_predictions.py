from flask import Blueprint, request
import app.endpoints.upload_and_get_predictions.services as services
import app.storage.abstractrepository as repo
import app.ml.utilities.retrieve_probable_prediction as retrieve
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
            
        # Initialize a list to store prediction data
        aggregated_predictions = []

        # Loop through the results and store prediction data
        for prediction in results:
            json_serializable_label_probability_dict = {key: str(value) for key, value in prediction.label_probability_dict.items()}
            most_probable_prediction = retrieve.read_csv("fruitfly", json_serializable_label_probability_dict)
            prediction_data = {
                'labels': json_serializable_label_probability_dict,
                'input_image_path': prediction.input_image_path,
                'probable_prediction': {
                    'label': most_probable_prediction.label,
                    'country': most_probable_prediction.country,
                    'genus': most_probable_prediction.genus,
                    'species': most_probable_prediction.species,
                    'image_file': most_probable_prediction.image_file
                }
            }
            aggregated_predictions.append(prediction_data)

        return aggregated_predictions, 200
    else:
        return 'No image provided', 400