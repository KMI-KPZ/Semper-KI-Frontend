# Semper-KI Frontend

## Description

The Semper-KI Frontend acts as a platform where users can submit their 3D printing requirements and find suitable service providers. It facilitates the process of connecting customers with providers based on their specific needs and the capabilities of the providers. Users can browse through available services and make informed decisions.

By leveraging artificial intelligence, the Semper-KI Frontend optimizes the matching process, ensuring simple, efficient and accurate service recommendations. It takes into account factors such as material properties, printing technology, pricing, and delivery options to provide users with the best possible matches.

The user interface of the Semper-KI Frontend is designed to be intuitive and user-friendly, allowing users to easily navigate through the platform, submit their requirements, and track the progress of their orders. It provides a seamless experience for both customers and service providers, streamlining the process of connecting supply and demand in the 3D printing industry.

## Download

To download the Semper-KI Frontend files, follow these steps:

1. Clone the repository: `git clone git@github.com:KMI-KPZ/Frontend.git`
2. Navigate to the project directory: `cd Semper-KI-Frontend`

## Local Development Server

To run the Semper-KI Frontend locally in development mode, use the following commands:

1. Install dependencies: `yarn install`
2. Start the development server: `yarn start`
3. The development server is runnning on: `http://127.0.0.1:3000/`

## Dockerized Servers

To run the Semper-KI Frontend using Docker, follow these steps:

1. Make sure Docker is installed on your System.
2. Navigate to the project directory: `cd Semper-KI-Frontend`

### Development

Start the development container with HMR

1. Start the development container: `docker compose -f "docker-compose.dev.yml" up -d --build`
2. The development server is exposed on: `http://127.0.0.1:3000/`

### Production / Staging

Start the production/staging container without HMR

1. Start the production/staging container: `docker compose -f "docker-compose.prod.yml" up -d --build` / `docker compose -f "docker-compose.staging.yml" up -d --build`
2. The production/staging server is exposed on: `http://127.0.0.1:3001/` / `http://127.0.0.1:3000/`

## Connection to Backend

The Semper-KI Frontend is designed to connect to the Semper-KI Backend. Please refer to the documentation of the Semper-KI Backend for instructions on how to set up and configure the backend.
