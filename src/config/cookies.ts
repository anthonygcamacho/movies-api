export const cookieSettings = {
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    signed: true,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1 as string,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2 as string,
    SECURE:
        process.env?.NODE_ENV && process.env.NODE_ENV == "production"
            ? true
            : false,
}
