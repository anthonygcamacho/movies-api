const env =
    process.env?.NODE_ENV && process.env.NODE_ENV == "production"
        ? "production"
        : "development"

const constants = {
    ENV: env,
    API_URL:
        env === "production"
            ? "https://project-sandbox-10e45.web.app"
            : "http://localhost:5000",
    LOGIN_PATH: "login",
    LOGIN_REDIRECT_PATH: "account",
    CREATE_USER_PATH: "users/create",
    CREATE_USER_REDIRECT_PATH: "account",
    RESET_PASSWORD_PATH: "password/reset",
    CREATE_NEW_PASSWORD_PATH: "password/create",
}

export default constants
