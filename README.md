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

## Docker Development Environment

### Prerequisites

The project requires:

* Docker Desktop
* Docker Compose

Docker Desktop must be running before starting the application.

### Starting the application

From the project root, run:

```bash
docker compose -f Infrastructure/docker-compose.yaml up --build -d
```

This starts the frontend and backend Docker services.

The frontend is available at:

```text
http://localhost:8080
```

The backend is available at:

```text
http://localhost:3000
```

The backend health endpoint is:

```text
http://localhost:3000/health
```

The health endpoint can also be accessed through Nginx at:

```text
http://localhost:8080/api/health
```

### Stopping the application

Run:

```bash
docker compose -f Infrastructure/docker-compose.yaml down
```

### Checking running containers

Run:

```bash
docker ps
```

The project should have the following containers running:

* `financial-computing-backend`
* `financial-computing-frontend`

### Docker architecture

The application uses two Docker services:

* **Frontend:** Nginx serving the frontend on port `8080`
* **Backend:** Node.js application exposed on port `3000`

The services communicate through the Docker network `financial-network`.

A named Docker volume is used for backend `node_modules`.

### Troubleshooting

If Docker commands fail to connect to the Docker engine, make sure Docker Desktop is running.

To rebuild and restart the application:

```bash
docker compose -f Infrastructure/docker-compose.yaml down
docker compose -f Infrastructure/docker-compose.yaml up --build -d
```

To view service logs:

```bash
docker compose -f Infrastructure/docker-compose.yaml logs --tail=50
```
