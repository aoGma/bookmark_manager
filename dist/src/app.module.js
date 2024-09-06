"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bookmarks_module_1 = require("./bookmarks/bookmarks.module");
const tags_module_1 = require("./tags/tags.module");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    !ENV ? 'config/dev.env' : `cofnig/${ENV}.env`,
                    'config/local.env',
                ],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        host: configService.get('DATABASE_HOST', '127.0.0.1'),
                        port: +configService.get('DATABASE_PORT', 3306),
                        username: configService.get('DATABASE_USER'),
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_NAME'),
                        synchronize: false,
                        entities: ['dist/src/**/entities/*.entity{.js,.ts}'],
                        migrations: ['dist/src/migrations/*{.js,.ts}'],
                        subscribers: ['dist/subscribers/*{.js,.ts}'],
                    };
                },
                inject: [config_1.ConfigService],
            }),
            tags_module_1.TagsModule,
            bookmarks_module_1.BookmarksModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map