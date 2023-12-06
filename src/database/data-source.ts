import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUsersTable1701281071975 } from './migrations/1701281071975-createUsersTable'
import User from "../app/entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 2222,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUsersTable1701281071975],
    subscribers: [],
})
