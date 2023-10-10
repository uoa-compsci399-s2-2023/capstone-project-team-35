import os
from PIL import Image
import csv
from pathlib import PurePath
from app.storage.abstractrepository import AbstractRepository
import app.globals as globals
from pathlib import Path
import base64

USER_UPLOADED_IMAGES_DIRECTORY  = globals.USER_UPLOADED_IMAGES_DIRECTORY
BATCH_PREDICTION_RESULTS_DIRECTORY          = globals.BATCH_PREDICTION_RESULTS_DIRECTORY  
INDIV_PREDICTION_RESULTS_DIRECTORY  = globals.INDIV_PREDICTION_RESULTS_DIRECTORY               

class LocalRepository(AbstractRepository):
    def create_individual_prediction_results_csv(self, complete_predictions_list):
        # Assuming each prediction in the list has the 'image_name' key
        image_name = complete_predictions_list[0]['image_name']
        RESULTS_FILE_PATH = os.path.join(INDIV_PREDICTION_RESULTS_DIRECTORY, f"{image_name}_predictions.csv")
        field_names = [
        'image_name', 'label', 'probability', 'rank', 'genus', 'species', 'country', 
        'in_NZ', 'endemic', 'unwanted_pest', 'native', 'introduced_biocontrol', 'distribution_url'
    ]
        if not os.path.exists(INDIV_PREDICTION_RESULTS_DIRECTORY):
            os.makedirs(INDIV_PREDICTION_RESULTS_DIRECTORY)
        with open(RESULTS_FILE_PATH, 'w', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=field_names)
            writer.writeheader()
            writer.writerows(complete_predictions_list)

    def write_to_batch_prediction_results_csv(self, complete_predictions_list):
        field_names = [
        'image_name', 'label', 'probability', 'rank', 'genus', 'species', 'country', 
        'in_NZ', 'endemic', 'unwanted_pest', 'native', 'introduced_biocontrol', 'distribution_url'
    ]
        RESULTS_FILE_PATH = os.path.join(BATCH_PREDICTION_RESULTS_DIRECTORY, "predictions.csv")  # Define the CSV file path
        
        file_exists = os.path.isfile(RESULTS_FILE_PATH)
        
        with open(RESULTS_FILE_PATH, 'a', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=field_names)
            
            if not file_exists:
                writer.writeheader()
            
            writer.writerows(complete_predictions_list)

    def add_image(self, image: Image):
        if not os.path.exists(USER_UPLOADED_IMAGES_DIRECTORY):
            os.makedirs(USER_UPLOADED_IMAGES_DIRECTORY)
        image_filename = USER_UPLOADED_IMAGES_DIRECTORY / PurePath(image.filename).name
        if not os.path.isfile(str(image_filename)):
            image.save(image_filename)        
        
    def get_base64_image(self, img_path: Path):
        image_base64 = None
        if os.path.exists(str(img_path)):
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
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
            return
        directory_contents = os.listdir(dir_path)
        for file in directory_contents:
            file_path = os.path.join(dir_path, file)
            if os.path.isfile(file_path):
                try:
                    os.remove(file_path)
                except OSError as e: 
                    print("Failed to clear directory; file path: {0}; error: {1}", file_path, e.strerror) 