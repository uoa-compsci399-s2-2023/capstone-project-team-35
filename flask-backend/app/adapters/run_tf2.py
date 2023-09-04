import os
import sys
import shutil
import os.path, time
from PIL import Image
from datetime import datetime, timedelta
import numpy as np
import uuid

import train_test_functions as ft

def main():
    DATASET_PATH = 'C:/Users/harmera/OneDrive - MWLR/repos/tephritidML/'
    model_dir = DATASET_PATH + 'models/'
    log_dir = DATASET_PATH + 'logs/'
    model_name = 'Xception'
    labels_path = DATASET_PATH + 'labels/labels3.csv'
    
    results = []
    for i in range(1,4):
        model_file = model_dir + 'trupanea_V1_{}_Xception_transfer.h5'.format(i)
        images_path = DATASET_PATH + 'img/trupanea_model/img_folds/{}/'.format(i)
        test_data_dir = images_path + 'val/'
    
        _, answers = ft.test_model(model_file, labels_path, test_data_dir, model_name)
        results += answers

if __name__ == '__main__':
  main()
