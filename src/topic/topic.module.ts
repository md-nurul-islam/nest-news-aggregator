import { Module } from "@nestjs/common";
import { TopicsService } from "./topic.service";
import { AWSTopicModeler } from "./awstopicmodeler.service";

@Module({
    imports: [],
    providers: [TopicsService, AWSTopicModeler],
    exports: [TopicsService, AWSTopicModeler],
})

export class TopicsModule {}
