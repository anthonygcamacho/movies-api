import * as path from "path"
import * as swaggerJsdoc from "swagger-jsdoc"

// -------------------------------------------------------------------------------

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API Docs",
            version: "1.0.0",
            description:
                "This is an example API demonstrating the use of different techs structure and architecture.",
        },
        components: {
            securitySchemas: {
                ApiKeysAuth: {
                    type: "apikey",
                    in: "query",
                    name: "api_key",
                },
            },
        },
        security: [
            {
                ApiKeysAuth: [],
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/api/v1/*.js")],
}

export const swaggerSpec = swaggerJsdoc(options)
