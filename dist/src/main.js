"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const response_interceptor_1 = require("./response/response.interceptor");
const http_filter_filter_1 = require("./http-filter/http-filter.filter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(compression());
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_filter_filter_1.HttpExceptionFilter(new common_1.Logger()));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map