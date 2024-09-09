import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TagsModule } from './tags/tags.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        !ENV ? 'config/dev.env' : `cofnig/${ENV}.env`,
        'config/local.env',
      ],
    }),
    // 动态注册
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST', '127.0.0.1'),
          port: +configService.get<number>('DATABASE_PORT', 3306),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          dateStrings: true,
          synchronize: false,
          entities: ['dist/src/**/entities/*.entity{.js,.ts}'],
          migrations: ['dist/src/migrations/*{.js,.ts}'],
          subscribers: ['dist/subscribers/*{.js,.ts}'],
        };
      },
      inject: [ConfigService],
    }),
    TagsModule,
    BookmarksModule,
    UploadModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
