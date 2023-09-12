from flask import Blueprint, request
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import json
import os

upload_blueprint = Blueprint('get_insect_types_bp', __name__)

@upload_blueprint.route('/get_insect_types', methods=['POST'])
def get_insect_types():
    path = os.getcwd() + "\\app" + "\ml" + "\models"
    dir_list = os.listdir(path)
    
    dictonary_list = []
    if len(dir_list) > 0:
        for folder in dir_list:
            label = folder[0].upper() + folder[1:]
            label_dictionary = {
                "label": label,
                "value": folder
                }
        
        dictonary_list.append(label_dictionary)
        return dictonary_list, 200
    else:
        return 'No labels found', 400