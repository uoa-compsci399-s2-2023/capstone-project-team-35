import os
from PIL import Image
from pathlib import PurePath
from app.storage.abstractrepository import AbstractRepository
import app.globals as globals

USER_UPLOADED_IMAGES_DIRECTORY =  globals.USER_UPLOADED_IMAGES_DIRECTORY                 

class LocalRepository(AbstractRepository):
    def add_image(self, image: Image):
        if not os.path.exists(USER_UPLOADED_IMAGES_DIRECTORY):
            os.makedirs(USER_UPLOADED_IMAGES_DIRECTORY)
        image_filename = USER_UPLOADED_IMAGES_DIRECTORY / PurePath(image.filename).name
        image.save(image_filename)

    def get_all_images(self) -> list:
        images = []
        for image in os.listdir(USER_UPLOADED_IMAGES_DIRECTORY):
            try:
                with Image.open(USER_UPLOADED_IMAGES_DIRECTORY / image) as img:
                    images.append(img)
            except:
                pass
        return images
    
    def get_image_by_name(self, path: str) -> Image:
        try:
            with Image.open(USER_UPLOADED_IMAGES_DIRECTORY / path) as img:
                return img
        
        except FileNotFoundError:
            return None
    
    def clear_directory(self, dir_path):
        directory_contents = os.listdir(dir_path)
        for file in directory_contents:
            file_path = os.path.join(dir_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)
