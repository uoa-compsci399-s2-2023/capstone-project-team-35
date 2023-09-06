from werkzeug.datastructures import FileStorage
from pathlib import Path
from typing import Dict

class Prediction:
    def __init__(self, label_probability_dict, input_image_path):
        self.__label_probability_dict = None
        self.__input_image_path = None
        
        if label_probability_dict is not None and len(label_probability_dict) > 0:
            self.__label_probability_dict = label_probability_dict
        
        if input_image_path is not None:
            self.__input_image_path = input_image_path

    @property
    def label_probability_dict(self) -> Dict[str, float]:
        return self.__label_probability_dict
    
    @label_probability_dict.setter
    def label_probability_dict(self, new_label_probability_dict: Dict[str, float]):
        self.label_probability_dict = new_label_probability_dict

        if new_label_probability_dict is not None and len(new_label_probability_dict) > 0:
            self.__label_probability_dict = new_label_probability_dict

    @property
    def input_image_path(self) -> Path:
        return self.__input_image_path
    
    @input_image_path.setter
    def input_image_path(self, new_input_image_path: Path):
        if new_input_image_path is not None:
            self.__input_image_path = new_input_image_path
    
    def __repr__(self):
        print("blablabla")
        return f'<Prediction: Label-probability {self.__label_probability_dict}, Input Image path {self.__input_image_path}>'
    