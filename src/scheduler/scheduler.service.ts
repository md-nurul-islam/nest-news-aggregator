import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RssParserService } from "src/rss/rss.service";
import { ArticleService } from "src/persistence/articles.service";
import { AWSTopicModeler } from "src/topic/awstopicmodeler.service";

@Injectable()
export class SchedulerService {
    constructor(
        private readonly rssService: RssParserService,
        private readonly articleService: ArticleService,
        private readonly awstopicmodeler: AWSTopicModeler,
    ) {}

    // @Cron(CronExpression.EVERY_10_MINUTES)
    // async handleCron() {
    //     const articles = await this.rssService.fetchArticle(process.env.FEED_URL);
    //     await this.articleService.saveArticles(articles);

    //     const documents = articles.map((article) => {
    //         return article.description;
    //     });

    //     this.awstopicmodeler.performTopicModeling(documents);

    //     console.log(`Articles fetched and saved at ${new Date().toISOString()}`);
    // }
}
