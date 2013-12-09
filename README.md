Levi's neo4j Sandbox
===

# Setup
1. pip install -r requirements.txt
2. Download and install [neo4j v1.9.5](http://www.neo4j.org/download/other_versions) graph database.
3. Run neo4j (any database directory is OK since we are accessing it via REST api)
3. Set/unset the production environment variable flag (windows virutualenv):
    - activate.bat ```SET IN_PRODUCTION=False```
    - deactivate.bat ```SET IN_PRODUCTION=```

## Quick Start
**Some data**

1. Make some example data ```python ./manage.py mkdata```
2. Remove ALL data ```python ./manage.py rmdata```

**The graph**

1. Check out the graph ```python ./manage.py runserver``` and visit http://127.0.0.1:8000
2. Refresh the page to get a random layout (will be a [force directed graph](https://github.com/mbostock/d3/wiki/Force-Layout) soon!)
3. Click anywhere to place a random circle

**List of data**

1. A Django template listing the current data at http://localhost:8000/citizens/
