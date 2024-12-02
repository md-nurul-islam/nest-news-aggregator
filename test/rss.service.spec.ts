import { Test, TestingModule } from "@nestjs/testing";
import { describe } from "node:test";
import { RssParserService } from "../src/rss/rss.service";

describe('RssParserService', () => {
    let rssService: RssParserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RssParserService],
        }).compile();

        rssService = module.get<RssParserService>(RssParserService);
    });

    it ("Should fetch articles from a valid RSS feed URL", async () => {
        const articles = await rssService.fetchArticle('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');
        expect(articles).toBeDefined();
        expect(Array.isArray(articles)).toBe(true);
    });

    it ('Should handle error gracefully for invalid URLs', async () => {
        await expect(rssService.fetchArticle('invalid-url')).rejects.toThrow();
    });
});
