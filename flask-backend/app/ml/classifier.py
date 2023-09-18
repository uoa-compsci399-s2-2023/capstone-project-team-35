from app.ml.abstractmodel import AbstractModel
import app.ml.utilities.train_test_functions as ft
from werkzeug.datastructures import FileStorage
from pathlib import Path

class Classifier(AbstractModel):
    def __init__(self, classifier_path: Path, classifier_name: str, labels_path: Path):
        self.__classifier_path = None
        self.__labels_path = None
        self.__classifier_name = None
        
        if isinstance(classifier_path, Path):
            self.__classifier_path = classifier_path
        
        if type(classifier_name) is str and classifier_name.strip() != "":
            self.__classifier_name = classifier_name.strip()
        
        if isinstance(labels_path, Path):
            self.__labels_path = labels_path
    
    def predict(self, images_path) -> list:
        labels, predictions, image_files, model = ft.run_model(self.__classifier_path, self.__labels_path, images_path, self.__classifier_name)
        return labels, predictions, image_files, model

    @property
    def classifier_path(self) -> Path:
        return self.__classifier_path
    
    @classifier_path.setter
    def classifier_path(self, new_classifier_path: Path):
        self.__classifier_path = None

        if isinstance(new_classifier_path, Path) and new_classifier_path != "":
            self.__classifier_path = new_classifier_path

    @property
    def classifier_name(self) -> str:
        return self.__classifier_name
    
    @property
    def labels_path(self) -> Path:
        return self.__labels_path
    
    @labels_path.setter
    def labels_path(self, new_labels_path: Path):
        self.__labels_path = None

        if isinstance(new_labels_path, Path) and new_labels_path != "":
            self.__labels_path = new_labels_path
    
    def __repr__(self):
        return f'<Classifier {self.__classifier_name}, Name {self.__classifier_name}, File path {self.__classifier_path}, Labels path {self.__labels_path}>'
    
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.classifier_name == other.__classifier_name
    
    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return True
        return self.__classifier_name < other.__classifier_name
    
    def __hash__(self):
        return hash(self.classifier_name)