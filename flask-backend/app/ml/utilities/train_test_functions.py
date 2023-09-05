# =====================================================================================
#
# Basic script for training a tensorflow 2 (keras) image classification model.
# Includes retraining from imagenet weights
# Supports multiple network architectures (InceptionV3, MobileNet, Xception)
#
# Authors:
#   Brent Martin (Manaaki Whenua Landcare Research)
#   Sheldon Coup (University of Canterbury)
#   
#   Adapted by Aaron Harmer (MWLR)
#   Reduced version for interface Adapted by Alex Wardega
# =====================================================================================

from enum import Enum
import os
from glob import glob
import shutil
import numpy as np
from scipy.special import softmax
import tensorflow as tf # TODO try using tf2 to confirm compatibility?
# from tensorflow import keras

# Keras models
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.applications.mobilenet import MobileNet
from tensorflow.keras.applications.xception import Xception, preprocess_input

# Keras utilities
import tensorflow.keras.backend as K
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, CSVLogger
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.python.keras.utils.generic_utils import CustomObjectScope # Needed because MobileNet uses this custom 'relu6' function

# TODO - needed?
config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
session = tf.compat.v1.Session(config = config)

# Supported model specifics
# Note: freeze layer def for all layers = (0, num_layers-1)
class Freeze(Enum):
  inception_v3 = (0,312)
  mobilenet = (0,83)
  xception = (0,133)

class Input_Size(Enum):
  inception_v3 = (299,299)
  mobilenet = (224,224)
  xception = (299,299)

def run_model(model_path, labels_path, test_images_path, model_name, ignore = None, model = None, reset = False):
  """
  Runs the model on a folder of images. 
  NOTE: Assumes the images are arranged into folders by class.
  
  - ignore: class number to ignore (typically "Empty")
  """

  # TODO this will be slow if the test image set is too large...
  # Assumes the test images are also arranged into folders by class  
  image_files = sorted(list(glob('{}/*/*.*'.format(test_images_path)))) 
  
  print("\nTesting model {} ({}) on {} ({} images):".format(model_path, model_name, test_images_path, len(image_files)))

  if model_name == 'InceptionV3':
    image_size = Input_Size.inception_v3.value
  elif model_name == 'Xception':
    image_size = Input_Size.xception.value
  elif model_name == 'MobileNet':
    image_size = Input_Size.mobilenet.value
  else:
    print("ERROR: Unknown model '{}': supported models are 'InceptionV3', 'MobileNet' and 'Xception'".format(model_name))
    return None
    
  with open(labels_path, 'r') as f:
    labels = [l for l in f.read().split('\n')]

  # Mobilenet uses a custom relu function so we load it in case it's needed
  if model:
     print("Using existing model")
  else:
    print('Loading model "{}"'.format(model_path))
    # with CustomObjectScope({'relu6': tf.keras.applications.mobilenet.relu6,'DepthwiseConv2D': tf.keras.applications.mobilenet.DepthwiseConv2D}):
    model = tf.keras.models.load_model(model_path)
    print('Model loaded.')
  
  datagen = ImageDataGenerator(preprocessing_function = preprocess_input)

  print('Predicting image classes...')
  data_generator = datagen.flow_from_directory(test_images_path, target_size = image_size, shuffle = False, batch_size = 1)
  predictions = model.predict(data_generator, steps = len(image_files)) # TODO - use glob to get the number of images
  print('Prediction complete.')
  # All done, clear keras' global state to avoid memory leaks
  if reset:
    K.clear_session()

  return labels, predictions, image_files, model


def test_model(model_path, labels_path, test_images_path, model_name, ignore = None):
  """
  Tests the model on a folder of images. 
  NOTE: Assumes the images are arranged into folders by class.
  
  - ignore: class number to ignore (typically "Empty")
  """

  labels, predictions, image_files, model = run_model(model_path, labels_path, test_images_path, model_name, ignore)
  
  # TODO - replace with confusion etc 

  correct = 0
  wrong = 0

  answers = []
  
  print('\nResults:')
  print('---------------------------------------------------------------------------------------------------------')
  print("Classes: {}".format(labels))
  for file_num, p in enumerate(predictions):
    best = 0
    second = 0
    best_index = -1
    for i, pr in enumerate(p):
      # p = softmax(p) # Not used!
      if (not ignore) or (i !=  ignore): # ignore one class (e.g. "empty")
        if pr > best:
          second = best
          best = pr
          best_index = i
        elif pr > second:
          second = pr
    file_path = os.path.relpath(image_files[file_num], test_images_path)
    filename = os.path.basename(file_path)
    class_name = os.path.dirname(file_path)
    answers.append((class_name, labels[best_index], best, file_path, p)) # (actual, predicted)
    if labels[best_index] == class_name:
      outcome = 'CORRECT'
      correct += 1
    else:
      outcome = '***WRONG***'
      wrong += 1
    print('Prediction for {} :{} => {}   {} ({})'.format(file_path, p, labels[best_index], outcome, best/second))

  print("\nResults for model {} ({}) on {} ({} images):".format(model_path, model_name, test_images_path, len(image_files)))
  print('\nCORRECT: {0} ({1:.2f})%  WRONG: {2} ({3:.2f})%'.format(correct, 100* correct/(correct + wrong), wrong, 100* wrong/(correct + wrong))) 
  print('---------------------------------------------------------------------------------------------------------')
  
  # All done, clear keras' global state to avoid memory leaks
  K.clear_session()

  return labels, answers
