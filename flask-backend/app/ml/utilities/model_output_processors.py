import csv
from app.domainmodel.insect import Insect
import app.globals as globals

def get_most_probable_prediction(label_probability_dict): #TODO: needed?
    temp_list = []
    for key in label_probability_dict.keys():
        temp_list.append((key, float(label_probability_dict[key])))
    return sorted(temp_list, key = lambda n: float(n[1]), reverse = True)[0][0]


def get_insect_by_label(global_species, label) -> Insect:
    species_annotations_file = globals.SPECIES_ANNOTATIONS_DIRECTORY / (global_species + ".csv")
    with open(species_annotations_file) as annotations_csv:
        reader = csv.DictReader(annotations_csv)
        for row in reader:
            if row['label'] == label:
                tags = {
                    "in_NZ": row["in_NZ"],
                    "endemic": row["endemic"],
                    "unwanted_pest": row["unwanted_pest"],
                    "native": row["native"],
                    "introduced_biocotrol": row["introduced_biocotrol"]
                }
                
                insect = Insect(row["label"], row["country"], row["genus"], row["species"], row["file"], tags)
                return insect