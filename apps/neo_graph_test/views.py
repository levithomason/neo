from django.shortcuts import render
from apps.citizens.models import Person, Country
import json

def create_graph(request):
    # get the objects
    people_category = Person.category()
    people = people_category.instance.all()

    country_category = Country.category()
    countries = country_category.instance.all()

    # create dictionaries
    people_dict = {}
    for p in people:
        person = {'name': p.name, 'age': p.age}

        people_dict[p.name] = person

    countries_dict = {}
    for c in countries:
        country = {'code': c.code, 'name': c.name}

        countries_dict[c.code] = country

    # make json objects
    people_json = json.dumps(people_dict)
    countries_json = json.dumps(countries_dict)

    return render(request, 'create_graph.html', {'people': people_json, 'countries': countries_json})