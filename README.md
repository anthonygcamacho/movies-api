# Movie Rest API Demo - Express Site / API on Firebase Hosting

Thank you for checking out what I can do with NodeJS / Express. This is just an demo application.

## Special Features

### In this application you will find these features:

| Feature       | Description                                  |
| :------------ | :------------------------------------------- |
| Express       | Site and API Routing                         |
| Auth          | Passport-Local and Passport-JWT              |
| AWS RDS       | AWS Relational Database Service (Postgres)   |
| Swagger       | OpenAPI 3.0 Standard API Route Documentation |
| TypeScript    | Coded in TypeScript                          |
| PG-Promise    | PostgreSQL Interface for NodeJS              |
| Morgan        | Logging                                      |
| Helmet / Cors | Security                                     |
| Jest Testing  | Integration and Unit Tests                   |

## Development

### Start local server and TypeScript watch

From root of project folder

```
> npm run serve:dev
```

### CSS & JS

Go into public folder to start Webpack watch script.

```
> cd public/src
```

Running Webpack watch script, watches for changes to ts and scss files.

```
> npm run watch:dev
```

### Web Component

Go into public folder to start Webpack watch script.

```
> cd public/web-components
```

StencilJS watch

```
> npm run watch:dev
```

### Docker

Build container

```
> docker build . -t anthonygcamacho/movies-api
```

Run container locally

```
> docker run --env-file=.env -it -p 8000:8000 anthonygcamacho/movies-api
```

Push to repo

```
> docker push anthonygcamacho/movies-api
```

## Database Model

[Modeled database using Oracle SQL Developer Data Modeler](https://www.oracle.com/database/sqldeveloper/technologies/sql-data-modeler/#:~:text=Oracle%20SQL%20Developer%20Data%20Modeler%20is%20a%20free%20graphical%20tool,dimensional%2C%20and%20data%20type%20models.)

![Movies REST API - Databasee](https://github.com/anthonygcamacho/movies-api/blob/master/data-model.png?raw=true)

## Resources

[Createapp.dev - Webpack Boilerplate](https://www.youtube.com/watch?v=Ij8SJe_mwpU)

[Swagger for an Express REST API - Document your API like a professional](https://www.youtube.com/watch?v=BOahFNoIrPk)

[How to install and run pgAdmin 4 on a Docker container - (PostgreSQL Tutorial with Dave Page)](https://www.youtube.com/watch?v=RUeTKUf6JV0)

### Todos

1. API:
    - login form
        - reset password
2. AWS:
    - reset password
    - CI/CD?
3. Documentation:
    - Site: README.md, home page, account page
    - Swagger:
        - https://blog.logrocket.com/documenting-express-js-api-swagger/

PGAdmin Docker Container
https://www.youtube.com/watch?v=RUeTKUf6JV0
