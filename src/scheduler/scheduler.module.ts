import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { RssModule } from 'src/rss/rss.module';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { AWSTopicModeler } from 'src/topic/awstopicmodeler.service';

@Module({
  imports: [
    RssModule,
    PersistenceModule
  ],
  providers: [AWSTopicModeler, SchedulerService],
})

export class SchedulerModule {}
