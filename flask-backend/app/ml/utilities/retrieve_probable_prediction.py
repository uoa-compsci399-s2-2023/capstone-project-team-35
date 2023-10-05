import csv
from app.domainmodel.insect import insect

def get_probable_prediction(label_probability_dict):
    temp_list = []
    for key in label_probability_dict.keys():
        temp_list.append((key, float(label_probability_dict[key])))
    return sorted(temp_list, key = lambda n: float(n[1]), reverse = True)[0][0]


def read_csv(filename, label_probability_dict):
    most_probable = get_probable_prediction(label_probability_dict) # returns the name of the most probable prediction
    file = "app\species_info\Annotations\\" + filename + ".csv" #soft code this
    with open(file) as label_csv:
        reader = csv.DictReader(label_csv)
        for row in reader:
            if row['label'] == most_probable:
                insect = insect(row["label"], row["country"], row["genus"], row["species"], row["file"], row["distribution_url"])
                insect.tags = {row["in_NZ"], row["endemic"], row["unwanted_pest"], row["native"], row["introduced_biocotrol"]}
                
                return insect
