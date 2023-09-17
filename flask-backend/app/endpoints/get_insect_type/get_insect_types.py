from flask import Blueprint, request
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import json
import os

upload_blueprint = Blueprint('get_insect_types_bp', __name__)

@upload_blueprint.route('/get_insect_types', methods=['GET'])
def get_insect_types():
    ml_models_dir_list = os.listdir(globals.ML_MODELS_DIRECTORY)
    dictonary_list = []
    
    if len(ml_models_dir_list) > 0:
        for model_directory in ml_models_dir_list:
            target_insect_type = model_directory.capitalize()
            label_dictionary = {
                "label": target_insect_type,
                "value": model_directory
                }
        
            dictonary_list.append(label_dictionary)
        return dictonary_list, 200
    else:
        return 'No labels found', 400