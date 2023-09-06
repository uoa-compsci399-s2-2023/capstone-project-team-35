from app.ml.abstractmodel import AbstractModel
import app.ml.utilities.train_test_functions as ft
from werkzeug.datastructures import FileStorage
from pathlib import Path

class Classifier(AbstractModel):
    def __init__(self, classifier_path: str, classifier_name: str, labels_path: str):
        self.__classifier_path = None
        self.__labels_path = None
        self.__classifier_name = None
        
        if classifier_path is not None:
            self.__classifier_path = classifier_path
        
        if classifier_name is not None and classifier_name != "":
            self.__classifier_name = classifier_name 
        
        if labels_path is not None:
            self.__labels_path = labels_path
    
    def predict(self, images_path) -> list:
        labels, predictions, image_files, model = ft.run_model(self.__classifier_path, self.__labels_path, images_path, self.__classifier_name)
        return labels, predictions, image_files, model

    @property
    def classifier_path(self) -> str:
        return self.__classifier_path
    
    @classifier_path.setter
    def classifier_path(self, new_classifier_path: Path):
        self.__classifier_path = None

        if type(new_classifier_path) is Path and new_classifier_path.strip() != "":
            self.__classifier_path = new_classifier_path

    @property
    def labels_path(self) -> str:
        return self.__labels_path
    
    @labels_path.setter
    def labels_path(self, new_labels_path: Path):
        self.__labels_path = None

        if type(new_labels_path) is Path and new_labels_path.strip() != "":
            self.__classifier_name = new_labels_path
    
    def __repr__(self):
        return f'<Classifier {self.__classifier_name}, Name {self.__classifier_name}, File path {self.__classifier_path}, Labels path {self.__labels_path}>'
    
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.classifier_name == other.__classifier_name
    
    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return True
        return self.__classifier_name == other.__classifier_name
    
    def __hash__(self):
        return hash(self.classifier_name)