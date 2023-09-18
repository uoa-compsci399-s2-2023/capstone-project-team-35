from flask import Blueprint, request
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import json
import os

upload_blueprint = Blueprint('get_insect_types_bp', __name__)

@upload_blueprint.route('/get_insect_types', methods=['GET'])
def get_insect_types():
    # makes a new variable to store every label folder in ml/models
    ml_models_dir_list = os.listdir(globals.ML_MODELS_DIRECTORY)
    dictonary_list = []

    # checks to see if there exists any file to loop through.
    if len(ml_models_dir_list) > 0:
        for model_directory in ml_models_dir_list:
            # capitalizes the front letter of the label.
            target_insect_type = model_directory.capitalize()
            label_dictionary = {
                "label": target_insect_type,
                "value": model_directory
                }

            # adds the label dictonary into a list so it's in a format for the front end to use
            dictonary_list.append(label_dictionary)
        # returns the string list and an OK request code
        return dictonary_list, 200
    else:
        # returns the string 'no labels found' and a bad request error code
        return 'No labels found', 400
