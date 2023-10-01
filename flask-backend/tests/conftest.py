import pytest
import os
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
    results = os.listdir(globals.RESULTS_FILE_DIRECTORY)

    
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

    if "sample_image.png_predictions.csv" in results:
        os.remove(globals.RESULTS_FILE_DIRECTORY / "sample_image.png_predictions.csv")
    if "sample_image2.png_predictions.csv" in results:
        os.remove(globals.RESULTS_FILE_DIRECTORY / "sample_image2.png_predictions.csv")
    if "sample_image3.png_predictions.csv" in results:
        os.remove(globals.RESULTS_FILE_DIRECTORY / "sample_image3.png_predictions.csv")