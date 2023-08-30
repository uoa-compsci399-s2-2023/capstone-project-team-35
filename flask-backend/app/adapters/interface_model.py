from app.adapters.ML_interface import AbstractInterface
from app.domainmodel.classifier import Classifier
import app.adapters.train_test_functions as ft
import app.adapters.standardise_images as si

class interface_model(AbstractInterface):
    def __init__(self, classifier_model: Classifier) -> None:
        self.__classifier_model = classifier_model
    
    def get_results(self, model_file, labels_path, images_dir, model_name) -> list:
        _, results = ft.test_model(model_file, labels_path, images_dir, model_name)
        return results
    
    def std_image(self, image_dir, out_path):
        si.standardise_image(image_dir, out_path)
    
    def std_images(self, in_path, out_path):
        si.standardise_images(in_path, out_path)