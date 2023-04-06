import { PassportStatic } from "passport"
import bcrypt = require("bcryptjs")
import { Strategy as PassportJwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import userModel from "../models/users/user.model"

const passportInitialize = (passport: PassportStatic) => {
    // Local strategy
    const localOptions = { usernameField: "email" }
    const localLogin = new LocalStrategy(
        localOptions,
        async (email, password, done) => {
            // console.log("JWT LOGIN ===============================")
            // console.log(email)
            // console.log(password)
            try {
                let userFound = await userModel.findUserByEmail(email)
                if (userFound.length > 0) {
                    const { user_id, password: hashedPassword } = userFound[0]
                    const isMatch = await bcrypt.compare(
                        password,
                        hashedPassword
                    )
                    if (isMatch) {
                        const user = await userModel.logUser(user_id)
                        return done(null, user[0].user_id)
                    } else {
                        return done(null, "FAILED")
                    }
                } else {
                    return done(null, "FAILED")
                }
            } catch (err) {
                return done(err)
            }
        }
    )

    // JWT strategy
    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_JWT_SECRET_OR_KEY_202303227,
    }
    const jwtLogin = new PassportJwtStrategy(
        jwtOptions,
        async (payload, done) => {
            // console.log("JWT LOGIN ===============================")
            // console.log(payload)
            try {
                let userFound = await userModel.findUserById(payload.sub)
                if (userFound.length > 0) {
                    const { user_id } = userFound[0]
                    return done(null, user_id)
                } else {
                    return done(null, "FAILED")
                }
            } catch (err) {
                return done(err)
            }
        }
    )

    passport.use(localLogin)
    passport.use(jwtLogin)

    passport.serializeUser((user, done) => {
        // console.log("SERIALIZE USER ===============================")
        // console.log(user)
        done(null, user)
    })
    passport.deserializeUser(async (id: number, done) => {
        // console.log("DESERIALIZE USER ===============================")
        // console.log(id)
        try {
            let userFound = await userModel.findUserById(id)
            if (userFound.length > 0) {
                const { user_id } = userFound[0]
                return done(null, user_id)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    })
}

export default passportInitialize
