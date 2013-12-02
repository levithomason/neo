import random
from django.core.management.base import NoArgsCommand
from apps.citizens.models import Person, Country


class Command(NoArgsCommand):

    help = 'Generates Person and Country nodes and relates them'

    def handle_noargs(self, **options):
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