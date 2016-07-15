import os
import subprocess
"""
Iterates through a given directory and converts shapefiles to geojson. This is useful for
shapefiles that are split using the 'split vector layer' tool in QGIS.
"""

for i in os.listdir(os.getcwd()):
    if i.endswith(".shp"): 
        arg_string = ('ogr2ogr -f GeoJSON -t_srs EPSG:4326 {0}.geojson {1}').format(i[:-4], i)
        # strip the .shp from the existing filename in order to create 'clean' .geojson
        subprocess.call(arg_string, shell=True)
        print ('created {0}.geojson').format(i[:-4])
        continue
    else:
        continue