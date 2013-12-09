from django.core.management.base import NoArgsCommand
from apps.citizens.models import Person, Country


class Command(NoArgsCommand):

    help = 'Deletes all Person and Country nodes'

    def handle_noargs(self, **options):
        confirm_word = 'DELETE'
        user_input = raw_input("\nType '%s' to delete ALL nodes from the database: " % confirm_word)

        if user_input == confirm_word:

            ##################################################
            # Person
            ##################################################

            person_category = Person.category()
            people = person_category.instance.all()

            if len(people) > 0:
                print "\nDeleting 'Person' nodes:"

                for p in people:
                    print "    x %s" % p.name
                    p.delete()
                print "    ...done!"

            else:
                print "\n    No 'Person' nodes to delete"

            ##################################################
            # Country
            ##################################################

            country_category = Country.category()
            countries = country_category.instance.all()

            if len(countries) > 0:
                print "\nDeleting 'Country' nodes:"

                for c in countries:
                    print "    x %s" % c.name
                    c.delete()
                print "    ...done!"

            else:
                print "\n    No 'Country' nodes to delete"

        else:
            print "\n    ...cancelled"