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
