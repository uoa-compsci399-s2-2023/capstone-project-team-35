import os
from PIL import Image
from pathlib import PurePath
from app.storage.abstractrepository import AbstractRepository
import app.globals as globals
from pathlib import Path
import base64

USER_UPLOADED_IMAGES_DIRECTORY =  globals.USER_UPLOADED_IMAGES_DIRECTORY                 

class LocalRepository(AbstractRepository):
    def add_image(self, image: Image):
        if not os.path.exists(USER_UPLOADED_IMAGES_DIRECTORY):
            os.makedirs(USER_UPLOADED_IMAGES_DIRECTORY)
        image_filename = USER_UPLOADED_IMAGES_DIRECTORY / PurePath(image.filename).name
        image.save(image_filename)
        
    def get_base64_image(self, img_path: Path):
        image_base64 = None
        if os.path.exists(img_path):
            try:
                with open(str(img_path), "rb") as img_file:
                    # Read the image data as bytes
                    image_data = img_file.read()
                    # Encode the image data as base64
                    image_base64 = base64.b64encode(image_data).decode('utf-8')
            except Exception as e:
                print(f"An exception occurred: {str(e)}")
        return image_base64

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
                try:
                    print(file_path)
                    os.remove(file_path)
                except OSError as e: 
                    print("Failed to clear directory; file path: {0}; error: {1}", file_path, e.strerror) 