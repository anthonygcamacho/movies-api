# Movie Rest API Demo

Try the Movies API app: [https://moviesapi.net](https://moviesapi.net)

## Special Features

### In this application you will find these features:

| Feature         | Description                                  |
| :-------------- | :------------------------------------------- |
| Express         | Site and API Routing                         |
| TypeScript      | Coded in TypeScript                          |
| SwaggerDocs     | OpenAPI 3.0 Standard API Route Documentation |
| PG-Promise      | PostgreSQL Interface for NodeJS              |
| Passport Auth   | Passport-Local and Passport-JWT              |
| Morgan          | Logging                                      |
| Helmet / Cors   | Security                                     |
| Jest Testing    | Integration and Unit Tests                   |
| EJS Templates   | HTML templates using EJS                     |
| StencilJS       | Forms and API table is built using StencilJS |
| KNEX Migrations | Migrations for database management           |
| AWS RDS         | AWS Relational Database Service (Postgres)   |
| AWS ECS Fargate | Load Balancing with ECS Docker               |

## Development

### Back-end

#### Start local server and watch changes

From root of project folder

```
> npm run serve:dev
```

### Front-end

#### CSS & JS

Go into public folder to start Webpack watch script.

```
> cd public/src
```

Running Webpack watch script, watches for changes to ts and scss files.

```
> npm run watch:dev
```

Build for Prod

```
> npm run build:prod
```

#### Web Component

Go into public folder to start Webpack watch script.

```
> cd public/web-components
```

StencilJS watch

```
> npm run watch:dev
```

Build for Prod

```
> npm run build:prod
```

### Docker Container build and deploy

Goto AWS Console for ECR and follow instructions for building and deployment.

## Database Model

![Movies REST API - Databasee](https://github.com/anthonygcamacho/movies-api/blob/master/data-model.png?raw=true)
