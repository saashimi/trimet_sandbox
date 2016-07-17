import os, json
from pprint import pprint
"""
Iterates through a given directory and adds attributes based on geojson filename.
"""

for filename in os.listdir(os.getcwd()):
    if filename.endswith('.geojson'):
        with open(filename) as geojson:
            data = json.load(geojson)
            data = data['features'][0]['properties']
            d = {}
            for key, value in data.items():
                if type(value) is unicode:
                    d[str(key)] = str(value)
                else:
                    d[key.encode('utf-8')] = value
                d['geojsonFilename'] = filename

            #string_data = { key.encode('utf-8'): value for key,value in data.items() }
            pprint(d)
            print(',')

