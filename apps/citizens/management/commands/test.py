from django.core.management.base import NoArgsCommand


class Command(NoArgsCommand):

    help = 'Generates Person and Country nodes and relates them'

    def handle_noargs(self, **options):
        country_data =\
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

        for i in range(len(country_data)):
            Country(name=country_data[i]['name'], code=country_data[i]['code']).save()
