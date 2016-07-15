import os
"""
Iterates through a given directory and adds attributes based on geojson filename.
"""

def formatter(rte_input, filename):
    bracket0 = "{\n"
    prop = "  id: 'rte_{0}',\n  geojsonFilename: '{1}'".format(rte_input, filename)
    bracket1 = "\n},\n"
    print bracket0, prop, bracket1

for i in os.listdir(os.getcwd()):
    if len(i) == 26:
        rte_num = i[15:18]
        formatter(rte_num, i)
                
    if len(i) == 25:
        rte_num = i[15:17]
        formatter(rte_num, i)
        
    if len(i) == 24:
        rte_num = i[15]
        formatter(rte_num, i)
       
    else:
        continue



    
    
    