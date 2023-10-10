from flask import Blueprint, send_file, request
import app.globals as globals
import os

download_result_blueprint = Blueprint('download_result_bp', __name__)

@download_result_blueprint.route('/download_individual_result/<string:imagename>', methods=['GET'])
def download_csv_result(imagename):
    target = globals.INDIV_PREDICTION_RESULTS_DIRECTORY
    # Formulate the prediction file path using the imagename
    prediction_file_path = os.path.join(target, f'{imagename}_predictions.csv')
        
    if os.path.exists(prediction_file_path):
        return send_file(prediction_file_path, as_attachment=True, download_name=f'{imagename}_predictions.csv')
    else:
        return "File not found", 404
