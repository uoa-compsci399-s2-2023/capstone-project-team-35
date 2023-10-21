"""Flask configuration variables."""
from os import environ

class AppConfig:
    """Set Flask configuration"""
    
    # Flask configuration
    FLASK_APP = 'ocellai_backend.py' 
    FLASK_ENV = 'production'                   # 'development' or 'production'
    TESTING = False                             # True or False.
    REPOSITORY = 'local'                        # 'local'
