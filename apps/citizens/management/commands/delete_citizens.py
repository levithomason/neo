from django.core.management.base import BaseCommand, CommandError
from apps.citizens.models import Person, Country


class Command(BaseCommand):

    def delete_people_and_countries():
        # person
        person_category = Person.category()
        for p in person_category.instance.all():
            p.delete()

        #country
        country_category = Country.category()
        for c in country_category.instance.all():
            c.delete()