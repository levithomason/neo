import random
from django.core.management.base import NoArgsCommand
from apps.citizens.models import Person, Country


class Command(NoArgsCommand):

    help = 'Generates Person and Country nodes and relates them'

    def handle_noargs(self, **options):
        #################################################################################################
        # Create some countries with UNIQUELY codes 
        #################################################################################################
        
        country_data = \
            [
                {
                    'name': 'United States of America',
                    'code': 'USA'
                },
                {
                    'name': 'Germany',
                    'code': 'DE'
                },
                {
                    'name': 'Europe',
                    'code': 'EU'
                },
                {
                    'name': 'Canada',
                    'code': 'CA'
                },
                {
                    'name': 'Mexico',
                    'code': 'MX'
                }
            ]

        print "\nMaking %s Countries:" % len(country_data)

        for i in range(len(country_data)):
            c = Country(name=country_data[i]['name'], code=country_data[i]['code']).save()

            print "    %s) %s" % (i + 1, c.name)

        print "    ...done!"

        country_category = Country.category()
        countries = country_category.instance.all()


        #################################################################################################
        # Create some UNIQUELY named people and assign them random countries 
        #################################################################################################
        
        people_data = \
            [
                {
                    'name': 'Joe',
                    'age': '25'
                },
                {
                    'name': 'Marcy',
                    'age': '28'
                },
                {
                    'name': 'Jane',
                    'age': '54'
                },
                {
                    'name': 'Paul',
                    'age': '34'
                },
                {
                    'name': 'Alfred',
                    'age': '68'
                },
                {
                    'name': 'Cory',
                    'age': '18'
                },
                {
                    'name': 'Kira',
                    'age': '42'
                },
                {
                    'name': 'Chris',
                    'age': '30'
                },
                {
                    'name': 'Jerica',
                    'age': '26'
                },
                {
                    'name': 'Levi',
                    'age': '26'
                },
                {
                    'name': 'Karena',
                    'age': '29'
                },
            ]

        print "\nMaking %s people:" % len(people_data)

        for i in range(len(people_data)):
            p = Person(name=people_data[i]['name'], age=people_data[i]['age']).save()

            random_country = random.choice(countries)
            p.country.connect(random_country)
            p.save()

            print "    %s) %s --> %s" % (i + 1, p.name, random_country.code)

        print "    ...done!"
