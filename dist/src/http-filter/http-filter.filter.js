"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : exception instanceof common_1.ForbiddenException
                ? common_1.HttpStatus.FORBIDDEN
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = '';
        if (exception instanceof common_1.BadRequestException) {
            message = exception?.['response']?.['message'];
            if (Array.isArray(message)) {
                message = message[0];
            }
        }
        else {
            message = exception.message
                ? exception.message
                : `${status >= 500
                    ? '服务器错误（Service Error）'
                    : '客户端错误（Client Error）'}`;
        }
        const nowTime = new Date().getTime();
        const errorResponse = {
            code: status,
            success: false,
            message,
            path: request.url,
            timestamp: nowTime,
        };
        this.logger?.error(`【${nowTime}】${request.method} ${request.url} query:${JSON.stringify(request.query)} params:${JSON.stringify(request.params)} body:${JSON.stringify(request.body)}`, JSON.stringify(errorResponse), 'HttpExceptionFilter');
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], HttpExceptionFilter);
//# sourceMappingURL=http-filter.filter.js.map