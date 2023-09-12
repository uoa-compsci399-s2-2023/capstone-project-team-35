from flask import Blueprint, request
import app.storage.abstractrepository as repo
from app.ml.utilities import model_output_processors as utils
import app.globals as globals
import json

upload_blueprint = Blueprint('get_insect_types_bp', __name__)

@upload_blueprint.route('/get_insect_types', methods=['POST'])
def get_insect_types():
    pass
    # path = "flask-backend\app\ml\models"
    # dir_list = os.listdir(path)
    # if len() > 0:
    #     return label_dictionary, 200
    # else:
    #     return 'No image provided', 400