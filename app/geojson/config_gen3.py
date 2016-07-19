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
                if key == "rte":
                    v1 = str(value)
                    d[str(key)] = v1
                    continue
                if key == "rte_desc":
                    v2 = str(value)
                    continue
                d['routeVerbose'] = v1 + ' - ' + v2  
                d['geojsonFilename'] = filename

            pprint(d)
            print(',')

