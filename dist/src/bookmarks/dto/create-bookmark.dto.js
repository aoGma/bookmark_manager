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
exports.CreateBookmarkDto = void 0;
const class_validator_1 = require("class-validator");
const bookmark_entity_1 = require("../entities/bookmark.entity");
class CreateBookmarkDto {
    constructor() {
        this.desc = '';
    }
}
exports.CreateBookmarkDto = CreateBookmarkDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookmarkDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookmarkDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'desc为字符串类型',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookmarkDto.prototype, "desc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(bookmark_entity_1.BookmarksIlk),
    __metadata("design:type", String)
], CreateBookmarkDto.prototype, "ilk", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({
        message: 'active为数字布尔类型(0,1)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBookmarkDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 'id必须是数字类型' }),
    __metadata("design:type", Array)
], CreateBookmarkDto.prototype, "tags", void 0);
//# sourceMappingURL=create-bookmark.dto.js.map