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
            schemas: {
                Actor: {
                    type: "object",
                    required: [
                        "first_name",
                        "last_name",
                        "gender",
                        "date_of_birth",
                    ],
                    properties: {
                        first_name: {
                            type: "string",
                            description: "The actor's first name",
                        },
                        last_name: {
                            type: "string",
                            description: "The actor's last name",
                        },
                        gender: {
                            type: "string",
                            description: "The actor's gender",
                        },
                        date_of_birth: {
                            type: "string",
                            description: "Birth date",
                        },
                    },
                },
                Director: {
                    type: "object",
                    required: [
                        "first_name",
                        "last_name",
                        "date_of_birth",
                        "nationality",
                    ],
                    properties: {
                        first_name: {
                            type: "string",
                            description: "The director's first name",
                        },
                        last_name: {
                            type: "string",
                            description: "The director's last name",
                        },
                        date_of_birth: {
                            type: "string",
                            description: "Birth date",
                        },
                        nationality: {
                            type: "string",
                            description: "Nationality",
                        },
                    },
                },
                Movie: {
                    type: "object",
                    required: [
                        "movie_name",
                        "movie_length",
                        "movie_lang",
                        "release_date",
                        "age_certificate",
                        "director_id",
                    ],
                    properties: {
                        movie_name: {
                            type: "string",
                            description: "The movie's first name",
                        },
                        movie_length: {
                            type: "number",
                            description: "Length in minutes",
                        },
                        movie_lang: {
                            type: "string",
                            description: "Language",
                        },
                        release_date: {
                            type: "string",
                            description: "Release date",
                        },
                        age_certificate: {
                            type: "string",
                            description: "Age certificate",
                        },
                        director_id: {
                            type: "number",
                            description: "The director ID",
                        },
                    },
                },
            },

            responses: {
                400: {
                    description:
                        "Missing API key - include it in the Authorization header",
                    contents: "application/json",
                },
                401: {
                    description:
                        "Unauthorized - incorrect API key or incorrect format",
                    contents: "application/json",
                },
                404: {
                    description: "Not found.",
                    contents: "application/json",
                },
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "query",
                    name: "api_key",
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/api/v1/*.js")],
}

export const swaggerSpec = swaggerJsdoc(options)
