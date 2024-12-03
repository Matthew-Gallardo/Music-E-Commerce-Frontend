# React-Spring-Boot-Music-E-Commerce-App

This project is a music e-commerce application built using modern web technologies. It features a robust frontend built with React and a powerful backend powered by Spring Boot.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Frontend
- React
- Material UI
- Styled Components
- Vite + Bun

### Backend
- Java 21
- Spring Boot
- Hibernate JPA
- PostgreSQL

### Services
- Cloudinary
- PayPal Sandbox

### Testing Tools
- JUnit
- Postman

## Project Structure

The project contains two React applications:
- `sbc-frontend`: The client-facing application
- `sbc-admin`: The admin-facing application

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Make sure you have the following installed:
- Java 21
- Bun
- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Matthew-Gallardo/React-Spring-Boot-Music-E-Commerce-App.git
    ```
2. Navigate to the project directory:
    ```sh
    cd React-Spring-Boot-Music-E-Commerce-App
    ```

3. Install frontend dependencies:
    ```sh
    cd SBC Frontend
    bun install
    ```
    ```sh
    cd SBC Admin
    bun install
    ```

4. Setup the backend:
    - Configure PostgreSQL database and update `application.properties` file with your database credentials.
    - Build and run the Spring Boot application:
      ```sh
      cd backend
      ./mvnw spring-boot:run
      ```

## Usage

To run the project locally, start both the frontend and backend servers.

### Running the Frontend

1. Navigate to the `SBC Frontend` directory:
    ```sh
    cd SBC Frontend
    ```
2. Start the development server:
    ```sh
    bun dev
    ```

1. Navigate to the `SBC Admin` directory:
    ```sh
    cd SBC Admin
    ```
2. Start the development server:
    ```sh
    bun dev
    ```

### Running the Backend

1. Navigate to the backend directory:
    ```sh
    cd sbcbackend
    ```
2. Start the Spring Boot application:
    ```sh
    ./mvnw spring-boot:run
    ```

## Contributing

Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
