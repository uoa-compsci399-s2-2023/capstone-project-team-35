"""Initialize Flask app."""

from flask import Flask
from pathlib import Path

import app.adapters.repository as repo
from app.adapters import local_repository

def create_app(test_config=None):
    """Construct the core application."""
    
    # Create the Flask app object.
    app = Flask(__name__)
    # Load default configuration
    app.config.from_object("config.Config")

         
    # Build the application - these steps require an application context
    with app.app_context():
        # Register blueprints
        from .upload import upload
        app.register_blueprint(upload.upload_blueprint)
    
        if app.config['REPOSITORY'] == 'memory':
            # Create the MemoryRepository impmentation for a memory-based repository
            repo.repo_instance = local_repository.LocalRepository()
        
    return app