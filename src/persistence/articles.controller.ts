import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./articles.service";
import { RssParserService } from "src/rss/rss.service";
import { AWSTopicModeler } from "src/topic/awstopicmodeler.service";

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly rssService: RssParserService,
        private readonly articlesService: ArticleService,
        private readonly awstopicmodeler: AWSTopicModeler,
        
    ) {}

    @ApiQuery({ name: 'keyword', required: false, type: String })
    @ApiQuery({ name: 'date', required: false, type: String })
    @Get()
    async getArticles(@Query('keyword') keyword?: string, @Query('date') date?: string) {
        return this.articlesService.findArticles(keyword, date);
    }
}
