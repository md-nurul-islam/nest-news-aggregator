import { DataSource } from "typeorm";
import { join, resolve } from "path";
import { dirname } from 'path';
import { config } from "dotenv";

const __dirname = dirname('.');
config({ path: resolve(__dirname, '.env') });

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_HOST) ?? 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    entities: [],
    migrations: [join(__dirname, '/src/migrations/**/*{.ts,.js}')],
    migrationsTableName: "migrations",
});
