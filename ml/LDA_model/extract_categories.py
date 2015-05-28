#!/usr/bin/python

import json

if __name__ == "__main__":

    with open('phi.json') as fstream:
        phi = json.load(fstream)

    categories = {}

    for topic in phi['topics']['topic']:

        name = topic['@name']
        category = topic['@category']
        id = int(topic['@id'])

        if name != "":

            if name not in categories:

                categories[name] = [id]

            else:

                categories[name].append(id)

        if category != "":

            if category not in categories:

                categories[category] = [id]

            else:

                categories[category].append(id)

    finalList =[]

    for cat in categories:

        newItem = {}
        newItem['name'] = cat
        newItem['ids'] = categories[cat]
        finalList.append(newItem)

    with open('categories.json', 'w') as outfile:  
        json.dump(finalList, outfile)
