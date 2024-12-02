import { Injectable } from "@nestjs/common";
import * as Parser from 'rss-parser';
import { TopicsService } from "src/topic/topic.service";

@Injectable()
export class RssParserService {
    private parser: Parser;

    constructor(
        private readonly topicService: TopicsService
    ) {
        this.parser = new Parser();
    }

    async fetchArticle(feedUrl: string) {
        try {
            const feed = await this.parser.parseURL(feedUrl);
            
            return feed.items.map((item) => ({
                    title: item.title,
                    creator: item.creator,
                    description: item.content,
                    publisheDate: item.isoDate.slice(0, 10),
                    sourceUrl: item.link,
                    topics: this.topicService.extractKeywords(item.content),
                }));

            // console.log(feed.items);
        } catch (error) {
            throw new Error(`Error fetching data from ${feedUrl}: ${error.message}`);
        }
    }
}
