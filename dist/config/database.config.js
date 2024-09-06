"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const ENV = process.env.NODE_ENV;
const configObj = {};
(0, dotenv_1.config)({
    path: [!ENV ? 'config/dev.env' : `config/${ENV}.env`, 'config/local.env'],
    processEnv: configObj,
});
const options = {
    type: 'mysql',
    host: configObj.DATABASE_HOST || '127.0.0.1',
    port: +configObj.DATABASE_PORT || 3306,
    username: configObj.DATABASE_USER,
    password: configObj.DATABASE_PASSWORD,
    database: configObj.DATABASE_NAME,
    synchronize: false,
    entities: ['src/**/entities/*.entity{.js,.ts}'],
    migrations: ['src/migrations/*{.js,.ts}'],
    subscribers: ['src/subscribers/*{.js,.ts}'],
};
exports.default = new typeorm_1.DataSource(options);
//# sourceMappingURL=database.config.js.map