from neomodel import (StructuredNode, StringProperty, IntegerProperty, RelationshipTo, RelationshipFrom)


class Country(StructuredNode):
    code = StringProperty(unique_index=True, required=True)
    name = StringProperty(index=True)

    # traverse incoming IS_FROM relation, inflate to Person objects
    inhabitant = RelationshipFrom('Person', 'IS_FROM')


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    age = IntegerProperty(index=True, default=0)

    # traverse outgoing IS_FROM relations, inflate to Country objects
    country = RelationshipTo('Country', 'IS_FROM')