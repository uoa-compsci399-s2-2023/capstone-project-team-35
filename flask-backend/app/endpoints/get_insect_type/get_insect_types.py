from flask import Blueprint, request
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import os

upload_blueprint = Blueprint('get_insect_types_bp', __name__)

@upload_blueprint.route('/get_insect_types', methods=['GET'])
def get_insect_types():
    ml_models_dirs = os.listdir(globals.ML_MODELS_DIRECTORY)
    dictonary_list = []
    
    if len(ml_models_dirs) > 0:
        for model_directory in ml_models_dirs:
            # Each model directory is named after the global insect species it predicts on
            target_insect_type = model_directory.capitalize()
            insect_type_info = {
                "label": target_insect_type,
                "value": model_directory # TODO: needed?
                }

            dictonary_list.append(insect_type_info)

        return dictonary_list, 200
    else:
        return 'No supported insect types found', 404