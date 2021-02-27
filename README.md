# FEM Friends

- **About**: Help you find frontend memtor solutions by challenge name.
- **Disclaimer**: This project is built for fun. If this repo violates your right, please raise an issue on the repo.
- **About folders**:
  - worker: for crawling data from original site
  - frontend: for displaying data
  - backend: for backend service to feed data to frontend

## How to start it

- Start backend server
  - copy config.prod.yml for production enviroment and config MongoDB provider based on your needs
  - start service `docker-compose up -d`
  - visit API at http://localhost:8080
- Start worker
  - copy config.yml.example and config fields based on your needs
  - start service `docker-compose up -d`;
