import * as path from "path"
import * as swaggerJsdoc from "swagger-jsdoc"

// -------------------------------------------------------------------------------

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: "1.0.0",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/api/v1/*.js")],
}

export const swaggerSpec = swaggerJsdoc(options)
