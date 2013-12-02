from django.shortcuts import render
from apps.citizens.models import Person, Country


def citizens(request):
    people_category = Person.category()
    people = people_category.instance.all()

    people_arr = []
    for p in people:
        people_arr.append([p.name, p.age, p.country.all()])

    country_category = Country.category()
    countries = country_category.instance.all()

    return render(request, 'citizens.html', { 'people':people, 'countries':countries, 'people_arr':people_arr })