neo
===

# Setup

1. pip install -r requirements.txt
2. Download and install [http://www.neo4j.org/download](neo4j graph db).
3. Run neo4j (default database directory is OK since we are accessing it via REST api)
3. Set/unset the production environment variable flag (windows virutualenv):
    - activate.bat ```SET IN_PRODUCTION=False```
    - deactivate.bat ```SET IN_PRODUCTION=```