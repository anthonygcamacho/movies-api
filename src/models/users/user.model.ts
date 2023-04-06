import { PreparedStatement as PS } from "pg-promise"
import { db } from "../../services/dbconnect"
const bcrypt = require("bcryptjs")

// -------------------------------------------------------------------------------

interface User {
    user_id: number
    email: string
    password: string
    user_created: Date
    last_login: Date
    api_key?: string
    api_key_created?: Date
}

const findUserById = async (id: number): Promise<User[] | []> => {
    const findUserByIdQuery = new PS({
        name: "find-user-by-id",
        text: "SELECT * FROM users WHERE user_id = $1",
        values: [id],
    })
    return await db.query(findUserByIdQuery)
}

const findUserByEmail = async (email: string): Promise<User[] | []> => {
    const findUserByEmailQuery = new PS({
        name: "find-user-by-email",
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    })
    return await db.query(findUserByEmailQuery)
}

const findUserByApiKey = async (apikey: string): Promise<User[] | []> => {
    const findUserByApiKeyQuery = new PS({
        name: "find-user-by-api-key",
        text: "SELECT * FROM users WHERE apikey = $1",
        values: [apikey],
    })
    return await db.query(findUserByApiKeyQuery)
}

const createUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const date = new Date()
    const createUserQuery = new PS({
        name: "create-user",
        text: "INSERT INTO users(email, password, user_created, last_login) VALUES ($1, $2, $3, $4) RETURNING user_id",
        values: [email, hashedPassword, date, date],
    })
    return await db.one(createUserQuery)
}

const deleteUserById = async (id: string): Promise<User[]> => {
    const deleteByIdQuery = new PS({
        name: "delete-user-by-id",
        text: "DELETE FROM users WHERE user_id = $1",
        values: [id],
    })
    return await db.query(deleteByIdQuery)
}

const logUser = async (id: number) => {
    const date = new Date()
    const loginUserQuery = new PS({
        name: "log-in-user",
        text: "UPDATE users SET last_login = $1 WHERE user_id = $2 RETURNING user_id",
        values: [date, id],
    })
    console.log(loginUserQuery)
    return await db.query(loginUserQuery)
}

export default {
    findUserById,
    findUserByEmail,
    findUserByApiKey,
    createUser,
    deleteUserById,
    logUser,
}
