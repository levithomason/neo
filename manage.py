#!/usr/bin/env python
import os, sys, random
from apps.citizens.models import Person, Country

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


def generate_citizens():
    # create some countries and save the nodes to countries[]
    country_codes = ['USA', 'DE', 'EU', 'CN', 'MX']

    i = 0
    for c in range(len(country_codes)):
        Country(code=country_codes[i]).save()

        i += 1

    country_category = Country.category()
    countries = country_category.instance.all()

    # create some UNIQUE named people and assign them random countries
    people = ['Joe', 'Bob', 'Daren', 'Jennifer', 'Tasha', 'Natalie', 'Rick']

    i = 0
    for p in range(len(people)):
        person = Person(name=people[i], age=random.randint(18, 70)).save()

        country = random.choice(countries)

        person.country.connect(country)
        person.save()

        i += 1


def delete_people_and_countries():
    # person
    person_category = Person.category()
    for p in person_category.instance.all():
        p.delete()
        
    #country
    country_category = Country.category()
    for c in country_category.instance.all():
        c.delete()