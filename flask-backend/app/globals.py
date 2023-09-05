"""Application's global variables."""
from utils import get_project_root

USER_UPLOADED_IMAGES_DIRECTORY = get_project_root() / "app" / "endpoints" / "upload_and_get_predictions" / "tmp" / "uploaded_images"          
STANDARDIZED_IMAGES_DIRECTORY = get_project_root() / "app" / "endpoints" / "upload_and_get_predictions" / "tmp" / "standardized_images"                                   
ML_MODELS_DIRECTORY = get_project_root() / "app" / "ml" / "models"
DEFAULT_MODEL_TYPE = "InceptionV3"