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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bookmark_entity_1 = require("./entities/bookmark.entity");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("../tags/entities/tag.entity");
let BookmarksService = class BookmarksService {
    constructor(bookmarksRepository, tagRepository) {
        this.bookmarksRepository = bookmarksRepository;
        this.tagRepository = tagRepository;
    }
    async create(dto, tags) {
        let tagsEntity = [];
        if (tags?.length) {
            tagsEntity = await this.tagRepository.findBy({
                id: (0, typeorm_2.In)(tags),
            });
            if (tagsEntity.length !== tags.length) {
                const existingTagIds = tagsEntity.map((tag) => tag.id);
                const missingTagIds = tags.filter((id) => !existingTagIds.includes(id));
                throw new common_1.HttpException(`tags: ${missingTagIds.join(', ')}不存在`, 400);
            }
        }
        const newBookmark = this.bookmarksRepository.create({
            ...dto,
            tags: tagsEntity,
        });
        try {
            await this.bookmarksRepository.manager.save(newBookmark);
        }
        catch (err) {
            if (err?.errno === 1062) {
                throw new common_1.HttpException('该条书签url已存在', 400);
            }
        }
        return '添加书签成功';
    }
    async findAll() {
        return await this.bookmarksRepository
            .createQueryBuilder('bookmark')
            .leftJoinAndSelect('bookmark.tags', 'tag')
            .getMany();
    }
    async findOne(id) {
        const bookmark = await this.bookmarksRepository.findOne({
            where: {
                id,
            },
        });
        if (!bookmark) {
            throw new common_1.HttpException('找不到该书签', 400);
        }
        return bookmark;
    }
    async update(id, updateBookmarkDto, tags) {
        let tagsEntity = [];
        if (tags?.length) {
            tagsEntity = await this.tagRepository.findBy({
                id: (0, typeorm_2.In)(tags),
            });
            if (tagsEntity.length !== tags.length) {
                const existingTagIds = tagsEntity.map((tag) => tag.id);
                const missingTagIds = tags.filter((id) => !existingTagIds.includes(id));
                throw new common_1.HttpException(`tags: ${missingTagIds.join(', ')}不存在`, 400);
            }
        }
        const bookmark = await this.bookmarksRepository.findOne({
            where: {
                id,
            },
        });
        if (!bookmark) {
            throw new common_1.HttpException('找不到该书签，无法修改', 400);
        }
        Object.assign(bookmark, updateBookmarkDto);
        if (tagsEntity.length) {
            Object.assign(bookmark, { tags: tagsEntity });
        }
        try {
            await this.bookmarksRepository.save(bookmark);
        }
        catch (err) {
            if (err?.errno === 1062) {
                throw new common_1.HttpException('要更改的目标书签已存在', 400);
            }
            else if (!err) {
                throw new common_1.HttpException('更新书签错误', 500);
            }
        }
        return '更新成功！';
    }
    remove(id) {
        return `This action removes a #${id} bookmark`;
    }
};
exports.BookmarksService = BookmarksService;
exports.BookmarksService = BookmarksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bookmark_entity_1.Bookmarks)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tags)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookmarksService);
//# sourceMappingURL=bookmarks.service.js.map