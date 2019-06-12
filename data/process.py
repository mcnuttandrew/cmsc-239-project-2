import csv
import json

# Step 1: only take the data we need, which is region, artist, and streams

# with open('world-data.csv', newline='') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         if (row['Date'][:4] == '2018'):
#             print(row['Region']+";"+row['Artist']+";"+row['Streams'])


# Step 2: create a json file that organizes the data by country, then artist with total number of streams in 2018

# with open('processed_data.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     dict = {}
#     for row in reader:
#         row = ''.join(row).split(";")
#         region = row[0]
#         artist = row[1]
#         streams = int(row[2])
#         if (region in dict):
#             if (artist in dict[region]):
#                 dict[region][artist] += streams
#             else:
#                 dict[region].update({artist: streams})
#         else:
#             dict[region] = {artist: streams}

#     with open('world-data.json', 'w', encoding='utf-8') as outfile:
#         json.dump(dict, outfile, ensure_ascii=False, indent=2)


# Step 3: Only keep top 5 artists from each country

with open('world-data.json') as json_file:  
    data = json.load(json_file)
    dict = {}
    for country in data.keys():
        top = sorted([[d, data[country][d]] for d in data[country].keys()], key=lambda x: x[1])[-5:][::-1]
        dict[country] = top
    with open('top-five.json', 'w', encoding='utf-8') as outfile:                                                                                           
         json.dump(dict, outfile, ensure_ascii=False, indent=2)   
