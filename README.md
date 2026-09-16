# Financial Computing Portfolio

This project is being developed as part of a practical Financial Computing portfolio.

The aim is to demonstrate software development, financial application design, Git/GitHub workflow, backend development, frontend development and Docker-based deployment.

## Project Structure

### Frontend

The `frontend` directory contains the user interface.

- `index.html` - main application page
- `css/` - application styling
- `js/` - browser-side JavaScript

### Backend

The `backend` directory contains the server-side application.

- `server.js` - backend server
- `package.json` - Node.js dependencies and scripts
- `db.json` - development datastore
- `Dockerfile` - backend container configuration
- `.gitignore` - files excluded from Git

### Infrastructure

The `Infrastructure` directory contains deployment and container configuration.

- `docker-compose.yaml` - runs the application services together

### Root Files

- `start_docker.sh` - starts the Docker environment
- `stop_docker.sh` - stops the Docker environment
- `nginx.conf` - Nginx configuration
- `.dockerignore` - files excluded from Docker builds

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Git
- GitHub
- Docker
- Nginx
- JSON

## Development Workflow

Development work is carried out using feature branches.

Example:

```bash
git checkout -b feature/project-structure