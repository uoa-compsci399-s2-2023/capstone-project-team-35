import os
from utils import get_project_root
from pathlib import Path
from werkzeug.datastructures import FileStorage

UPLOAD_IMAGES_DIRECTORY = get_project_root() / "app" / "upload" / "uploads"

def store_user_uploaded_image(image: FileStorage):
    if not os.path.exists(UPLOAD_IMAGES_DIRECTORY):
        os.makedirs(UPLOAD_IMAGES_DIRECTORY)
    image_filename = Path(UPLOAD_IMAGES_DIRECTORY) / image.filename
    image.save(image_filename)
    print("bla")