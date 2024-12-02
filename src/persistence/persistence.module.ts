import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./articles.entity";
import { ArticleService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { RssModule } from "src/rss/rss.module";
import { TopicsModule } from "src/topic/topic.module";

@Module({
    imports: [TypeOrmModule.forFeature([Article]), RssModule, TopicsModule],
    controllers: [ArticlesController],
    providers: [ArticleService],
    exports: [ArticleService]
})

export class PersistenceModule {};
