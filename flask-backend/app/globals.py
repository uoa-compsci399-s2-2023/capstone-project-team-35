"""Application's global variables."""
from utils import get_project_root

USER_UPLOADED_IMAGES_DIRECTORY              = get_project_root() / "app" / "data" / "tmp" / "images" / "user_uploaded_images"
STANDARDIZED_IMAGES_DIRECTORY               = get_project_root() / "app" / "data" / "tmp" / "images" / "standardized_images"  
BATCH_PREDICTION_RESULTS_DIRECTORY          = get_project_root() / "app" / "data" / "tmp" / "prediction_results" / "batch_result"
INDIV_PREDICTION_RESULTS_DIRECTORY          = get_project_root() / "app" / "data" / "tmp" / "prediction_results" / "batch_results"
ML_MODELS_DIRECTORY                         = get_project_root() / "app" / "data" / "ml" / "models"
SPECIES_INFO_DIRECTORY                      = get_project_root() / "app" / "data" / "species_info"
SPECIES_ANNOTATIONS_DIRECTORY               = SPECIES_INFO_DIRECTORY / "Annotations"
SPECIES_SAMPLE_IMAGES_DIRECTORY             = SPECIES_INFO_DIRECTORY / "Images"
DEFAULT_MODEL_TYPE                          = "InceptionV3"
DEFAULT_INSECT_SUPERTYPE                    = "fruitfly"
TOP_PREDICTIONS_COUNT                       = 10