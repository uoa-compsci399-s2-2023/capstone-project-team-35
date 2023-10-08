
import concurrent.futures
import pygbif
from pygbif import occurrences
import app.globals as globals

MAX_NUMBER_OF_THREADS = 500
RECORD_RETRIEVAL_LIMIT = 300
MAX_RECORDS_TO_RETRIEVE = 1000

def get_occurences_count_by_country(taxonId: int) -> dict:
    total_num_of_available_records = occurrences.count(taxonKey=taxonId)
    
    num_records_to_retrieve = min(MAX_RECORDS_TO_RETRIEVE, total_num_of_available_records)
    raw_results_list = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_NUMBER_OF_THREADS) as executor:
        # Create a list of offsets to fetch data concurrently
        record_offsets = [offset for offset in range(0, num_records_to_retrieve, RECORD_RETRIEVAL_LIMIT)]
    
        # Fetch records concurrently, in batches (of a maximum of RECORD_RETRIEVAL_LIMIT many records per request)
        batch_record_futures = {executor.submit(fetch_species_occurrences, offset, RECORD_RETRIEVAL_LIMIT, taxonId): offset for offset in record_offsets}
        
        for record_future in concurrent.futures.as_completed(batch_record_futures):
            current_offset = batch_record_futures[record_future]
            try:
                results = record_future.result()
                raw_results_list.extend(results)
            except Exception as e:
                print(f"An error occurred while fetching species occurence data for offset {current_offset}: {str(e)}")
    
        # Count occurrences per country
        country_occurrences = {}
        for record in raw_results_list:
            country_name = record.get('country')
            if country_name is None:
                continue
            if country_name not in country_occurrences:
                country_occurrences[country_name] = 0
            country_occurrences[country_name] += 1

        return country_occurrences
    
def fetch_species_occurrences(offset, limit, taxon_key):
    results = occurrences.search(taxonKey=taxon_key, limit=limit, offset=offset)
    return results.get('results', [])

    
