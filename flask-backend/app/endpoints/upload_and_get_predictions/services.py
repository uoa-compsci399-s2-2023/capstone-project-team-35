import app.globals as globals
from app.storage.abstractrepository import AbstractRepository
from PIL import Image
from app.ml.classifier import Classifier
from app.ml.prediction import Prediction
import app.ml.utilities.standardise_images as si
import app.ml.utilities.model_output_processors as mop
from werkzeug.datastructures import FileStorage
from typing import Dict
from pathlib import Path
from pathlib import PurePath
import os

def save_predictions_as_csv(prediction, repo: AbstractRepository):
    prediction_results = []
    label_probability_dict = prediction.label_probability_dict
    input_image_path = prediction.input_image_path
    image_name = os.path.basename(input_image_path)
    for label in label_probability_dict:
        insect = mop.get_insect_by_label(globals.DEFAULT_INSECT_SUPERTYPE, label)

        # Makes a new dictonary based on the resulting prediction the model creates
        result = {
            "image_name": image_name,
            "label": insect.label,
            "probability": str(round(label_probability_dict[label], 3)),
            "genus": insect.genus,
            "species": insect.species,
            "country": insect.country,
            "rank": None,  # We will assign it after sorting
            "in_NZ": insect.tags["in_NZ"],
            "endemic": insect.tags["endemic"],
            "unwanted_pest": insect.tags["unwanted_pest"],
            "native": insect.tags["native"],
            "introduced_biocontrol": insect.tags["introduced_biocontrol"],
            "distribution_url": insect.distribution_url
        }
        prediction_results.append(result)

    # Sort predictions by probability in descending order
    prediction_results.sort(key=lambda x: float(x["probability"]), reverse=True)

    # Assign rank to each prediction
    for index, result in enumerate(prediction_results, start=1):
        result["rank"] = index

    # Supplies the helper functions within the repo the prediction so it can get sorted for the csv results
    repo.write_to_batch_prediction_results_csv(prediction_results)
    repo.create_individual_prediction_results_csv(prediction_results)

def store_user_uploaded_images(images: list[FileStorage], repo: AbstractRepository):
    repo.clear_directory(globals.USER_UPLOADED_IMAGES_DIRECTORY)
    for image in images:
        repo.add_image(image)

def get_base64_image(path: Path, repo: AbstractRepository) -> str:
    image = repo.get_base64_image(path)
    return image

def get_predictions(images: list[FileStorage], insect_type: str, model_type: str, repo: AbstractRepository) -> Dict[str, float]:
    # Initialises the directory by clearing it of the previous results
    repo.clear_directory(globals.BATCH_PREDICTION_RESULTS_DIRECTORY)
    repo.clear_directory(globals.INDIV_PREDICTION_RESULTS_DIRECTORY)
    store_user_uploaded_images(images, repo)

    # Checks that a model has been selected, if no model has been selected, use the default
    if model_type is None:
        model_type = globals.DEFAULT_MODEL_TYPE

    # Sets up the paths for the directories used
    model_path = globals.ML_MODELS_DIRECTORY / insect_type / model_type.lower() / "model.h5"
    labels_path = globals.ML_MODELS_DIRECTORY / insect_type / "labels" / "labels.csv"
    uploaded_images_directory_path = globals.USER_UPLOADED_IMAGES_DIRECTORY
    standardized_images_directory_path = globals.STANDARDIZED_IMAGES_DIRECTORY

    # Clears the images directory after getting the path so old images are used
    repo.clear_directory(standardized_images_directory_path / "Images")
    si.standardise_images(uploaded_images_directory_path, standardized_images_directory_path / "Images")
    model = Classifier(model_path, model_type, labels_path)

    labels, predictions, image_files, model = model.predict(standardized_images_directory_path)

    # Declares the paths for each that had been uploaded on the front end
    user_uploaded_image_files = []
    for image_path in image_files:
        name, extension =  os.path.splitext(image_path)
        for user_image_path in os.listdir(uploaded_images_directory_path):
            uploaded_name, uploaded_extension = os.path.splitext(user_image_path)
            if uploaded_name == PurePath(name).name:
                user_uploaded_image_files.append(user_image_path)
    
    results = []

    # Iterate through labels and predictions and create the dictionary
    for index in range(0, len(predictions)):
        label_probability_dict = {}
        for label, probability in zip(labels, predictions[index]):
            label_probability_dict[label] = round(probability, 3)
        
        # Sort the dictionary items based on their values in descending order
        sorted_prediction_values = sorted(label_probability_dict.items(), key=lambda item: item[1], reverse=True)
        
        # Convert the sorted items back into a dictionary and extract top predictions
        top_predictions_dict = dict(sorted_prediction_values[:globals.TOP_PREDICTIONS_COUNT])
        new_prediction = Prediction(top_predictions_dict, str(globals.USER_UPLOADED_IMAGES_DIRECTORY / Path(user_uploaded_image_files[index])))
        save_predictions_as_csv(new_prediction, repo)
        results.append(new_prediction)            

    return results
