# Movie Rest API Demo - Express Site / API on Firebase Hosting

Thank you for checking out what I can do with NodeJS / Express. This is just an demo application.

## Special Features

### In this application you will find these features:

| Feature          | Description                                      |
| :--------------- | :----------------------------------------------- |
| Express          | Site and API Routing                             |
| Firebase Hosting | Express used as a Firebase Function              |
| AWS RDS          | Using AWS Relational Database Service (Postgres) |
| Swagger          | OpenAPI 3.0 Standard API Route Documentation     |
| TypeScript       | Coded in TypeScript                              |
| PG-Promise       | PostgreSQL Interface for NodeJS                  |
| Morgan           | Logging                                          |
| Helmet / Cors    | Security                                         |
| Jest Testing     | Integration and Unit Tests                       |
| Handlebars       | Todo                                             |
| Token Based Auth | Todo                                             |

## Development

### Start local server

From root of project folder

```
> firebase serve
```

### Back-End

Go into functions folder to start TypeScript watch script.

```
> npm run build:watch
```

### Front-End

Go into public folder to start Webpack watch script.

```
> cd public
```

Running Webpack watch script, watches for changes to ts and scss files.

```
> npm run watch
```

### Deploy to Firebase project

From root of project folder

```
> firebase deploy
```

## Database Model

[Modeled database using Oracle SQL Developer Data Modeler](https://www.oracle.com/database/sqldeveloper/technologies/sql-data-modeler/#:~:text=Oracle%20SQL%20Developer%20Data%20Modeler%20is%20a%20free%20graphical%20tool,dimensional%2C%20and%20data%20type%20models.)

![Movies REST API - Databasee](https://github.com/anthonygcamacho/movies-rest-api/blob/main/data-model.png?raw=true)

## Resources

[Createapp.dev - Webpack Boilerplate](https://www.youtube.com/watch?v=Ij8SJe_mwpU)

[Firebase Functions timeout when querying AWS RDS PostgreSQL database](https://stackoverflow.com/questions/63384587/firebase-functions-timeout-when-querying-aws-rds-postgresql-database)
# movies-api
