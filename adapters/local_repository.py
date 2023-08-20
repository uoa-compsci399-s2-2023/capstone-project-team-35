import os

from PIL import Image
from utils import get_project_root
from adapters.repository_interface import AbstractRepository

IMAGE_DIR = get_project_root() / "images"
MODEL_DIR = get_project_root() / "models"

class LocalRepository(AbstractRepository):
    def add_image(self, img):
        img.save(IMAGE_DIR / img.filename[img.filename.rfind('\\')+1:])

    def get_images(self):
        images = []
        for image in os.listdir(IMAGE_DIR):
            try:
                with Image.open(IMAGE_DIR / image) as img:
                    images.append(img)
            except:
                pass
        return images
    
    def get_image_by_name(self, path):
        try:
            with Image.open(IMAGE_DIR / path) as img:
                return img
        
        except FileNotFoundError:
            return None