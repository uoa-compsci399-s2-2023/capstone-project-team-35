import app.globals as globals
from app.storage.abstractrepository import AbstractRepository
from app.ml.classifier import Classifier
from app.ml.prediction import Prediction
import app.ml.utilities.standardise_images as si
import app.ml.utilities.model_output_processors as mop
from werkzeug.datastructures import FileStorage
from typing import Dict
import os

def save_predictions(sorted_prediction_dict, image_file_index, repo: AbstractRepository):
    result = Prediction(sorted_prediction_dict, image_file_index)
    predictions = []
    label_probability_dict = result.label_probability_dict
    input_image_path = result.input_image_path
    image_name = os.path.basename(input_image_path)
    for label in label_probability_dict:
        insect = mop.get_insect_by_label(globals.DEFAULT_INSECT_SUPERTYPE, label)
        prediction = {
            "image_name": image_name,
            "label": insect.label,
            "probability": str(round(label_probability_dict[label], 3)),
            "genus": insect.genus,
            "species": insect.species,
            "country": insect.country,
        }
        predictions.append(prediction)

     # Sort predictions by probability in descending order
    predictions.sort(key=lambda x: float(x["probability"]), reverse=True)

    # Assign rank to each prediction
    for index, prediction in enumerate(predictions, start=1):
        prediction["rank"] = index

    repo.add_results_csv(predictions)

def store_user_uploaded_images(images: list[FileStorage], repo: AbstractRepository):
    for image in images:
        repo.add_image(image)

def get_predictions(images: list[FileStorage], insect_type: str, model_type: str, repo: AbstractRepository) -> Dict[str, float]: 
    repo.clear_directory(globals.RESULTS_FILE_DIRECTORY)
    store_user_uploaded_images(images, repo) # TODO: need to check if image is already present, or is it already done? 
    if model_type is None:
        model_type = globals.DEFAULT_MODEL_TYPE

    model_path = globals.ML_MODELS_DIRECTORY / insect_type / model_type.lower() / "model.h5"
    labels_path = globals.ML_MODELS_DIRECTORY / insect_type / "labels" / "labels.csv"
    uploaded_images_directory_path = globals.USER_UPLOADED_IMAGES_DIRECTORY
    standardized_images_directory_path = globals.STANDARDIZED_IMAGES_DIRECTORY
    
    si.standardise_images(uploaded_images_directory_path, standardized_images_directory_path / "Images") #TODO: get rid of hardcoded "Images"
    model = Classifier(model_path, model_type, labels_path)

    labels, predictions, image_files, model = model.predict(standardized_images_directory_path) #TODO: Return uploaded images instead of standardized images
    
    results = []

    # Iterate through labels and predictions and create the dictionary
    for index in range(0, len(predictions)):
        label_probability_dict = {}
        for label, probability in zip(labels, predictions[index]):
            label_probability_dict[label] = round(probability, 3)
        
        # Sort the dictionary items based on their values in descending order
        sorted_prediction_values = sorted(label_probability_dict.items(), key=lambda item: item[1], reverse=True)
        save_predictions(dict(sorted_prediction_values), image_files[index], repo)
        
        # Convert the sorted items back into a dictionary and extract top predictions
        top_predictions_dict = dict(sorted_prediction_values[:globals.TOP_PREDICTIONS_COUNT])
                
        new_prediction = Prediction(top_predictions_dict, image_files[index])
        results.append(new_prediction)            
    
    repo.clear_directory(uploaded_images_directory_path)
    repo.clear_directory(standardized_images_directory_path / "Images") #TODO: get rid of hardcoded "Images"
    
    return results
