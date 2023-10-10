"""Initialize Flask app."""

from flask import Flask
from pathlib import Path

import app.storage.abstractrepository as repo
from app.storage.local import local_repository

def create_app(test_config=None):
    """Construct the core application."""
    
    # Create the Flask app object.
    app = Flask(__name__)
    # Load default configuration
    app.config.from_object("config.Config")

         
    # Build the application - these steps require an application context
    with app.app_context():
        # Register blueprints
        from .endpoints.upload_and_get_predictions import upload_and_get_predictions
        from .endpoints.get_insect_type import get_insect_types 
        from .endpoints.download_predictions import download_results
        from .endpoints.download_individual_prediction import download_individual_result
        from .endpoints.get_species_occurences_by_country import get_species_occurences_by_country
        
        app.register_blueprint(upload_and_get_predictions.upload_blueprint)
        app.register_blueprint(get_insect_types.upload_blueprint)
        app.register_blueprint(download_results.download_blueprint)
        app.register_blueprint(download_individual_result.download_blueprint)
        app.register_blueprint(get_species_occurences_by_country.get_occurences_blueprint)
    
        if app.config['REPOSITORY'] == 'local':
            # Create the LocalRepository impmentation for a local repository
            repo.repo_instance = local_repository.LocalRepository()
        
    return app