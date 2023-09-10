import os
from PIL import Image
import csv
from pathlib import Path
from app.storage.abstractrepository import AbstractRepository
import app.globals as globals

USER_UPLOADED_IMAGES_DIRECTORY  = globals.USER_UPLOADED_IMAGES_DIRECTORY
RESULTS_FILE_DIRECTORY          = globals.RESULTS_FILE_DIRECTORY                 

class LocalRepository(AbstractRepository):
    
    def add_results_csv(self, complete_predictions_list, input_image_path):
        field_names= ['label', 'probability', 'genus', 'species', 'country']
        if not os.path.exists(RESULTS_FILE_DIRECTORY):
            os.makedirs(RESULTS_FILE_DIRECTORY)
        file_name = os.path.basename(input_image_path) + "_predictions.csv"
        file_path = os.path.join(RESULTS_FILE_DIRECTORY, file_name)
        with open(file_path, 'w') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=field_names)
            writer.writeheader()
            writer.writerows(complete_predictions_list)

    def add_image(self, image: Image):
        if not os.path.exists(USER_UPLOADED_IMAGES_DIRECTORY):
            os.makedirs(USER_UPLOADED_IMAGES_DIRECTORY)
        image_filename = Path(USER_UPLOADED_IMAGES_DIRECTORY) / image.filename
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
