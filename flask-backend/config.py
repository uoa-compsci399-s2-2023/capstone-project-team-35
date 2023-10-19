"""Flask configuration variables."""
from os import environ
from dotenv import load_dotenv

# Load environment variables from file .env, stored in this directory. 
load_dotenv()

class AppConfig:
    """Set Flask configuration from .env file"""
    
    # Flask configuration
    FLASK_APP = environ.get("FLASK_APP")
    FLASK_ENV = environ.get("FLASK_ENV")
    TESTING = environ.get("TESTING")
    REPOSITORY = environ.get('REPOSITORY')