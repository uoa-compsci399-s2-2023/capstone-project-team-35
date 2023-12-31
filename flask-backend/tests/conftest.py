import pytest
import os
import csv
import app.globals as globals
from app import create_app
from app.storage.local.local_repository import LocalRepository

'''
To run tests, do 'pytest flask-backend/tests/unit' from project root
'''

@pytest.fixture
def local_repo():
    repo = LocalRepository()
    return repo

@pytest.fixture
def client():
    my_app = create_app({'TESTING': True})
    return my_app.test_client()

@pytest.fixture(scope='session', autouse=True)
def end_of_tests():
    yield
    
    uploaded_images = os.listdir(globals.USER_UPLOADED_IMAGES_DIRECTORY)
    standardized_images = os.listdir(globals.STANDARDIZED_IMAGES_DIRECTORY / "Images")
    batch_results = os.listdir(globals.BATCH_PREDICTION_RESULTS_DIRECTORY)
    single_results = os.listdir(globals.INDIV_PREDICTION_RESULTS_DIRECTORY)
    
    if "sample_image.jpg" in uploaded_images:
        os.remove(globals.USER_UPLOADED_IMAGES_DIRECTORY / "sample_image.jpg")
    if "sample_image2.jpg" in uploaded_images:
        os.remove(globals.USER_UPLOADED_IMAGES_DIRECTORY / "sample_image2.jpg")
    if "sample_image3.jpg" in uploaded_images:
        os.remove(globals.USER_UPLOADED_IMAGES_DIRECTORY / "sample_image3.jpg")
    
    if "sample_image.png" in standardized_images:
        os.remove(globals.STANDARDIZED_IMAGES_DIRECTORY / "Images" / "sample_image.png")
    if "sample_image2.png" in standardized_images:
        os.remove(globals.STANDARDIZED_IMAGES_DIRECTORY / "Images" / "sample_image2.png")
    if "sample_image3.png" in standardized_images:
        os.remove(globals.STANDARDIZED_IMAGES_DIRECTORY / "Images" / "sample_image3.png")

    if "predictions.csv" in batch_results:
        os.remove(globals.BATCH_PREDICTION_RESULTS_DIRECTORY / "predictions.csv")
    
    if "sample_image.jpg_predictions.csv" in single_results:
        os.remove(globals.INDIV_PREDICTION_RESULTS_DIRECTORY / "sample_image.jpg_predictions.csv")
    if "sample_image2.jpg_predictions.csv" in single_results:
        os.remove(globals.INDIV_PREDICTION_RESULTS_DIRECTORY / "sample_image2.jpg_predictions.csv")
    if "sample_image3.jpg_predictions.csv" in single_results:
        os.remove(globals.INDIV_PREDICTION_RESULTS_DIRECTORY / "sample_image3.jpg_predictions.csv")