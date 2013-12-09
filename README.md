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
1. Make some example data: ```python ./manage.py mkdata```
2. Delete ALL data: ```python ./manage.py rmdata```
3. Run server and visit http://127.0.0.1:8000/citizens/