"""Application's global variables."""
from utils import get_project_root

USER_UPLOADED_IMAGES_DIRECTORY              = get_project_root() / "app" / "endpoints" / "upload_and_get_predictions" / "tmp" / "uploaded_images"          
STANDARDIZED_IMAGES_DIRECTORY               = get_project_root() / "app" / "endpoints" / "upload_and_get_predictions" / "tmp" / "standardized_images"  
BATCH_PREDICTION_RESULTS_FILE_DIRECTORY     = get_project_root() / "app" / "endpoints" / "download_predictions" / "tmp" / "batch_results_file"         
INDIV_PREDICTION_RESULTS_FILE_DIRECTORY     = get_project_root() / "app" / "endpoints" / "download_individual_prediction" / "tmp" / "results_files"                         
ML_MODELS_DIRECTORY                         = get_project_root() / "app" / "ml" / "models"
SPECIES_ANNOTATIONS_DIRECTORY               = get_project_root() / "app" / "species_info" / "Annotations"
SPECIES_SAMPLE_IMAGES_DIRECTORY             = get_project_root() / "app" / "species_info" / "Images"
DEFAULT_MODEL_TYPE                          = "InceptionV3"
DEFAULT_INSECT_SUPERTYPE                    = "fruitfly"
TOP_PREDICTIONS_COUNT                       = 10