from app.adapters.ML_interface import AbstractInterface
from app.domainmodel.classifier import Classifier
import app.adapters.train_test_functions as ft
import app.adapters.standardise_images as si

'''
model_file is the .h5 file we get given
labels_path is the path to the label file we want to use. 
images_dir direct path to the specific image we want to predict
model_name is the name of the model we're predicting

in_path is the path for the folder of the images we want to standardise
    don't get this confused with image_dir.
out_path is the path to the folder where we want to store the standardised images

'''

class interface_model(AbstractInterface):
    def __init__(self, classifier_model: Classifier) -> None:
        self.__model_name = classifier_model.classifier_name()
        self.__model_file = classifier_model.classifier_file()
    
    def get_results(self, labels_path, images_dir) -> list:
        _, results = ft.test_model(self.__model_file, labels_path, 
                                   images_dir, self.__model_name)
        return results
    
    def std_image(self, image_dir, out_path):
        si.standardise_image(image_dir, out_path)
    
    def std_images(self, in_path, out_path):
        si.standardise_images(in_path, out_path)