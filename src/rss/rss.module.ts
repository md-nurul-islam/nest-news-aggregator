import { Module } from "@nestjs/common";
import { RssParserService } from './rss.service';
import { TopicsModule } from "src/topic/topic.module";

@Module({
    imports: [TopicsModule],
    providers: [RssParserService],
    exports: [RssParserService]
})

export class RssModule {};
