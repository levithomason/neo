from django.core.management.base import NoArgsCommand
from apps.citizens.models import Person, Country


class Command(NoArgsCommand):

    help = 'Deletes all Person and Country nodes'

    def handle_noargs(self, **options):
        # person
        person_category = Person.category()
        for p in person_category.instance.all():
            p.delete()

        #country
        country_category = Country.category()
        for c in country_category.instance.all():
            c.delete()