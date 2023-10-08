from flask import Blueprint, request
import app.globals as globals
import app.endpoints.get_species_occurences_by_country.services as services
import json

get_occurences_blueprint = Blueprint('get_species_occurences_bp', __name__)

@get_occurences_blueprint.route('/get_occurences_by_country/<taxonId>', methods=['GET'])
def get_occurences_by_country(taxonId: int):
    top_counts_by_country_dict = services.get_occurences_count_by_country(taxonId)
    
    countries = []
    counts = []
    for country, count in top_counts_by_country_dict.items():
        countries.append(country)
        counts.append(count)
    
    response_json = {
        "locations": countries,
        "tally": counts
    }
    
    return response_json, 200
        