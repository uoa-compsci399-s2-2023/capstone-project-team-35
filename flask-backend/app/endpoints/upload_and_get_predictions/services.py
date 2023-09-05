import app.globals as globals
from app.storage.abstractrepository import AbstractRepository
from app.ml.classifier import Classifier
import app.ml.utilities.standardise_images as si
from werkzeug.datastructures import FileStorage
from typing import Dict

def store_user_uploaded_images(images: list[FileStorage], repo: AbstractRepository):
    for image in images:
        repo.add_image(image)

def get_predictions(images: list[FileStorage], insect_type: str, model_type: str, repo: AbstractRepository) -> Dict[str, float]: 
    store_user_uploaded_images(images, repo)
    if model_type is None:
        model_type = globals.DEFAULT_MODEL_TYPE

    model_path = globals.ML_MODELS_DIRECTORY / insect_type / model_type.lower() / "model.h5"
    labels_path = globals.ML_MODELS_DIRECTORY / insect_type / "labels" / "labels.csv"
    uploaded_images_directory_path = globals.USER_UPLOADED_IMAGES_DIRECTORY
    standardized_images_directory_path = globals.STANDARDIZED_IMAGES_DIRECTORY
    
    si.standardise_images(uploaded_images_directory_path, standardized_images_directory_path / "Images") #TODO: get rid of hardcoded "Images"
    model = Classifier(model_path, model_type, labels_path)
    labels, predictions, image_files, model = model.predict(standardized_images_directory_path)
    
    label_prediction_dict = {}

    # Iterate through labels and predictions and create the dictionary
    for label, prediction in zip(labels, predictions[0]):
        label_prediction_dict[label] = prediction
            
    # Sort the dictionary items based on their values in descending order
    sorted_prediction_values = sorted(label_prediction_dict.items(), key=lambda item: item[1], reverse=True)

    # Convert the sorted items back into a dictionary
    sorted_predictions_dict = dict(sorted_prediction_values)
    
    repo.clear_directory(uploaded_images_directory_path)
    repo.clear_directory(standardized_images_directory_path / "Images") #TODO: get rid of hardcoded "Images"
    
    return sorted_predictions_dict
