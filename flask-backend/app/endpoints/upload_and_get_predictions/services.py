import os
from app.adapters.repository import AbstractRepository
from utils import get_project_root
from pathlib import Path
from werkzeug.datastructures import FileStorage

UPLOAD_IMAGES_DIRECTORY = get_project_root() / "app" / "upload" / "uploads"

def store_user_uploaded_image(image: FileStorage, repo: AbstractRepository):
    repo.add_image(image)