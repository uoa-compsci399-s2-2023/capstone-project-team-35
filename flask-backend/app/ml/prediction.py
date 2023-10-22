from werkzeug.datastructures import FileStorage
from pathlib import Path
from typing import Dict

"""
Below is a model that allows us keep all of the prediction information in once location.
This allows different files in the program to make calls using the same prediction.

"""

class Prediction:
    def __init__(self, label_probability_dict: Dict[str, float], input_image_path: str):
        self.__label_probability_dict = None
        self.__input_image_path = None
        
        if isinstance(label_probability_dict, dict) and len(label_probability_dict) > 0:
            self.__label_probability_dict = label_probability_dict
        
        if isinstance(input_image_path, str) and input_image_path.strip() != '':
            self.__input_image_path = input_image_path.strip()

    @property
    def label_probability_dict(self) -> Dict[str, float]:
        return self.__label_probability_dict
    
    @label_probability_dict.setter
    def label_probability_dict(self, new_label_probability_dict: Dict[str, float]):
        self.__label_probability_dict = None

        if isinstance(new_label_probability_dict, dict) and len(new_label_probability_dict) > 0:
            self.__label_probability_dict = new_label_probability_dict

    @property
    def input_image_path(self) -> str:
        return self.__input_image_path
    
    @input_image_path.setter
    def input_image_path(self, new_input_image_path: str):
        self.__input_image_path = None

        if isinstance(new_input_image_path, str) and new_input_image_path.strip() != '':
            self.__input_image_path = new_input_image_path.strip()
    
    def __repr__(self):
        return f'<Prediction: Label-probability {self.label_probability_dict}, Input Image path {self.input_image_path}>'
    
