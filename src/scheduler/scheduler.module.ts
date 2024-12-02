import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { RssModule } from 'src/rss/rss.module';
import { PersistenceModule } from 'src/persistence/persistence.module';

@Module({
  imports: [RssModule, PersistenceModule],
  providers: [SchedulerService],
})

export class SchedulerModule {}
