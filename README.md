# Investment Portfolio Analytics Platform

## Project Overview

A full-stack web application for consolidating investment, securities, market-price, performance, timeseries, currency, and FX data into a single interface.

The project demonstrates the development of a financial analytics platform using a JavaScript frontend, Node.js/Express REST API, JSON data store, and containerised deployment.

---

## Business Problem

Investment professionals often work across multiple data sources and spreadsheets when reviewing portfolio information. Consolidating securities, prices, performance, currencies, and historical data into one application can simplify analysis and provide a more consistent view of investment information.

This project demonstrates how a centralised financial-data application can be designed and implemented.

---

## Key Features

* **Authentication** — user login and access control.
* **Dashboard** — consolidated overview of portfolio information.
* **Securities** — security-level data and information.
* **Market Prices** — pricing data for monitored securities.
* **Investment Performance** — portfolio and investment performance data.
* **Timeseries** — historical financial data.
* **Currencies** — supported currency information.
* **FX Rates** — foreign-exchange data.
* **Horizon** — longer-term investment analysis.
* **CSV Export** — export financial data for external analysis.

---

## Technology Stack

| Technology     | Role                             |
| -------------- | -------------------------------- |
| HTML / CSS     | Frontend structure and styling   |
| JavaScript     | Client-side application logic    |
| Node.js        | Backend runtime                  |
| Express        | REST API framework               |
| REST APIs      | Frontend/backend communication   |
| JSON           | Development data store           |
| Docker         | Containerisation                 |
| Docker Compose | Multi-container orchestration    |
| Nginx          | Web server / reverse proxy       |
| Git            | Version control                  |
| GitHub         | Source control and collaboration |

---

## Architecture

```text
Browser
   │
   ▼
Nginx
   │
   ▼
Frontend
   │
   │ HTTP / REST
   ▼
Node.js / Express
   │
   ▼
db.json
```

The browser serves the frontend application, which communicates with the Express backend through HTTP requests. Express handles API routing and data operations against the JSON data store. Nginx provides the web-server/reverse-proxy layer.

---

## Application Modules

| Module         | Function                    |
| -------------- | --------------------------- |
| Authentication | User login                  |
| Dashboard      | Portfolio overview          |
| Securities     | Security information        |
| Market Prices  | Market pricing              |
| Performance    | Investment performance      |
| Timeseries     | Historical data             |
| Currencies     | Currency information        |
| FX Rates       | Foreign-exchange data       |
| Horizon        | Investment horizon analysis |
| CSV Export     | Data extraction             |

---

## Project Structure

```text
project/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   ├── server.js
│   ├── db.json
│   └── package.json
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
└── README.md
```

---

## API Endpoints

The frontend communicates with the backend through REST endpoints, including:

```text
GET  /health
POST /login
GET  /securities
GET  /prices
GET  /performance
GET  /timeseries
GET  /currencies
GET  /fx-rates
GET  /horizon
GET  /export
```

Endpoints are responsible for retrieving application data and supporting frontend functionality.

---

## Docker Setup

Docker separates the application into reproducible services managed through Docker Compose.

```text
Docker Compose
├── Nginx
│   └── Frontend
│
└── Node.js / Express
    └── db.json
```

Build and start the application with:

```bash
docker compose up --build
```

Stop the containers with:

```bash
docker compose down
```

---

## How to Run

### Prerequisites

* Git
* Docker
* Docker Compose

### Clone

```bash
git clone <repository-url>
cd <project-directory>
```

### Start

```bash
docker compose up --build
```

The application can then be accessed through the configured Nginx address.

The backend health endpoint can be used to verify API availability:

```text
http://localhost:3000/health
```

---

## User Journey

```text
Login
  ↓
Dashboard
  ↓
Securities / Market Prices
  ↓
Performance
  ↓
Timeseries / FX
  ↓
Horizon Analysis
  ↓
CSV Export
```

---

## Horizon Analytics

The Horizon module supports analysis across different investment periods rather than focusing solely on a single point in time.

It provides a framework for examining how financial metrics and investment information change over short-, medium-, and long-term horizons.

---

## Financial Concepts

The application incorporates several core investment concepts:

* **Securities** — financial instruments being monitored or analysed.
* **Market Prices** — observed security prices.
* **Performance** — changes in investment value over time.
* **Timeseries** — financial observations indexed by date.
* **FX Rates** — exchange rates between currencies.
* **Investment Horizon** — the period over which an investment is analysed.

---

## Testing

Testing includes:

* frontend functionality and navigation;
* authentication;
* REST API requests;
* frontend/backend communication;
* backend health checks;
* financial-data retrieval;
* CSV export;
* Docker container startup and rebuilds.

---

## Development Workflow

```text
Plan → Develop → Test → Debug → Refine → Commit → Push
```

Git is used to track development changes, while GitHub provides repository management and version history.

Docker is used throughout development to maintain a consistent runtime environment.

---

## Known Limitations

* `db.json` is suitable for development but not production-scale data storage.
* Authentication requires additional security controls for production use.
* Market and FX data depends on available data sources.
* The application is a portfolio demonstration rather than a production portfolio-management system.
* Production deployment would require additional security, monitoring, validation, and scalability measures.

---

## Future Improvements

* Replace `db.json` with a relational database such as PostgreSQL.
* Implement secure password hashing and session management.
* Integrate live market and FX APIs.
* Add portfolio risk and performance metrics.
* Introduce interactive financial charts.
* Add automated data updates.
* Implement automated unit, integration, and end-to-end testing.
* Deploy to a cloud environment with monitoring and logging.

---

## Project Purpose

This project demonstrates the application of **full-stack software engineering to a financial-services use case**, combining frontend development, REST APIs, financial data handling, investment analytics, Docker containerisation, Nginx, and version control.
