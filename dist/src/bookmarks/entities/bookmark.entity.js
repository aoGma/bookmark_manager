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
exports.Bookmarks = exports.BookmarksIlk = void 0;
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("../../tags/entities/tag.entity");
var BookmarksIlk;
(function (BookmarksIlk) {
    BookmarksIlk["READ_LATER"] = "\u7A0D\u540E\u9605\u8BFB";
    BookmarksIlk["COLLECTION_REFERENCE"] = "\u6536\u85CF\u53C2\u8003";
    BookmarksIlk["PRESERVATION"] = "\u957F\u671F\u4FDD\u5B58";
})(BookmarksIlk || (exports.BookmarksIlk = BookmarksIlk = {}));
let Bookmarks = class Bookmarks {
};
exports.Bookmarks = Bookmarks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bookmarks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Bookmarks.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true, length: 500 }),
    __metadata("design:type", String)
], Bookmarks.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bookmarks.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BookmarksIlk,
        default: BookmarksIlk.READ_LATER,
    }),
    __metadata("design:type", String)
], Bookmarks.prototype, "ilk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Bookmarks.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Bookmarks.prototype, "clicks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Bookmarks.prototype, "create_timestamp", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Bookmarks.prototype, "update_timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tags),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Bookmarks.prototype, "tags", void 0);
exports.Bookmarks = Bookmarks = __decorate([
    (0, typeorm_1.Entity)()
], Bookmarks);
//# sourceMappingURL=bookmark.entity.js.map