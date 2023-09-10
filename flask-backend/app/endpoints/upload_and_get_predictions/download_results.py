from flask import Blueprint, send_file
import app.globals as globals
import os
from io import BytesIO
from zipfile import ZipFile
from glob import glob

download_blueprint = Blueprint('download_results_bp', __name__)

@download_blueprint.route('/download', methods=['GET'])
def download_csv_results():
    target = globals.RESULTS_FILE_DIRECTORY
    stream = BytesIO()
    with ZipFile(stream, 'w') as zf:
        for file in glob(os.path.join(target, '*.csv')):
            zf.write(file, os.path.basename(file))
    stream.seek(0)

    return send_file(stream, as_attachment=True, download_name='predictions.zip')