require("dotenv").config()
import * as path from "path"
import * as express from "express"
import helmet from "helmet"
// import * as passport from "passport"
import * as morgan from "morgan"
import * as swaggerUi from "swagger-ui-express"
// const cookieSession = require("cookie-session")

// import { cookieSettings } from "./config/cookies"
import { swaggerSpec } from "./services/swagger"
// import passportInitialize from "./services/passport"

import routes from "./routes"

// -------------------------------------------------------------------------------

const app = express()

// Security
app.use(helmet())

// App settings
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// Cookies
// app.use(
//     cookieSession({
//         name: cookieSettings.name,
//         maxAge: cookieSettings.maxAge,
//         keys: [cookieSettings.COOKIE_KEY_1, cookieSettings.COOKIE_KEY_2],
//         secure: cookieSettings.SECURE,
//     })
// )
// app.use((req, res, next) => {
//     if (req.session && !req.session.regenerate) {
//         req.session.regenerate = (cb: any) => {
//             cb()
//         }
//     }
//     if (req.session && !req.session.save) {
//         req.session.save = (cb: any) => {
//             cb()
//         }
//     }
//     next()
// })

// Passport
// passportInitialize(passport)
// app.use(passport.initialize())
// app.use(passport.session())

// View settings
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// API Docs
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use("/", routes)

let port = 3000
app.listen(port, () => {
    console.log(`App listening on: ${port}`)
})
