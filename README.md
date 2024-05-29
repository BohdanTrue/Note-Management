# <div align="center">Note Managment</div>

Simple fullstack application for managment notes using Spring Boot + React

## Get Started

To run the project, follow this instruction:

1. Clone the repository:
    ```bash
    git clone .
    ```

2. Download [JDK](https://www.oracle.com/java/technologies/downloads/), [Apache Maven](https://maven.apache.org/download.cgi), [Docker](https://docs.docker.com/get-docker/) and NPM (it means, you should have [NodeJS](https://nodejs.org/en) on your machine)

3. Move on the <strong>server</strong> directory
    ```bash
    cd .\server\
    ```

4. Build the project using:
    ```bash
    mvn clean package 
    ```

5. Then, rise a **Docker** container of your app:
    ```bash
    docker-compose build
    docker-compose up
    ```

Cool! Your server-side logic already running!

Let's move on to the client directory and run him

1. Move on the <strong>server</strong> directory
    ```bash
    cd ..\client\
    ```

2. Install all dependencies using npm
    ```bash
    npm install
    ```

3. Run frontend side
    ```bash
    npm start
    ```

You can run simple e2e test using ```npx cypress run --spec "cypress\e2e\home.page.spec.cy.ts"``` (you should have installed cypress in dev dependencies before - ```npm install cypress --save-dev```)

## Technologies used

- ### Backend Technologies
    - **Java 17**: the primary programming language for backend development.
    - **Spring Boot**: the framework for building and deploying Java-based applications.
    - **Spring Boot Starter Data JPA**: starter for using Spring Data JPA with Hibernate.
    - **Spring Boot Starter Web**: starter for building web applications, including RESTful APIs.
    - **Hibernate Validator**: a powerful and flexible framework for data validation.
    - **Liquibase**: a database-independent library for tracking, managing and applying database schema changes.
    - **MapStruct**: simplifies the implementation of bean mappings, reducing manual coding effort.
    - **Lombok**: a tool to reduce boilerplate code, enhancing code readability and conciseness.
    - **Postgres Database**: a powerful object-relational database.
    - **Maven**: a build automation tool used primarily for Java projects, managing project dependencies and lifecycle.
    - **Docker**: a platform for developing, shipping, and running applications inside containers, ensuring consistency across multiple environments.
- ### Frontend Technologies
  - **Typescript**: a statically typed superset of JavaScript that enhances development with type safety and modern features.
  - **React**: a JavaScript library for building user interfaces, particularly single-page applications with dynamic content.
  - **Cypress**: an end-to-end testing framework that ensures the reliability and performance of web applications.
  - **axios**: a promise-based HTTP client for making requests to backend services, simplifying asynchronous operations.
  - **i18n localization**: provides a comprehensive solution for localizing web applications.
  - **bulma**: a modern CSS framework based on Flexbox, providing responsive and clean design elements.
  - **zustand**: a small, fast, and scalable state management solution for React applications, offering a minimalistic API.
  - **SASS**: a preprocessor scripting language that is interpreted or compiled into CSS, extending CSS with variables, nested rules, and more.

## Application Endpoints

  - **Note controller:**
      - `POST: api/notes` -> Create a new note.
      - `GET: api/notes` -> Get all notes.
      - `GET: api/notes/{noteId}` -> Get a note by certain id
      - `PUT: api/notes/{noteId}` -> Update a note by certain id
      - `DELETE: api/notes/{noteId}` -> Delete a note by certain id