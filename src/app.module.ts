import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Article } from './persistence/articles.entity';
import { PersistenceModule } from './persistence/persistence.module';
import { SchedulerService } from './scheduler/scheduler.service';
import { RssParserService } from './rss/rss.service';
import { TopicsService } from './topic/topic.service';
import { AWSTopicModeler } from './topic/awstopicmodeler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: parseInt(process.env.DATABASE_HOST) ?? 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Article],
      synchronize: false,
    }),
    PersistenceModule,
    ScheduleModule.forRoot(),
    SchedulerModule
  ],
  controllers: [AppController],
  providers: [AppService, RssParserService, TopicsService, AWSTopicModeler, SchedulerService],
})

export class AppModule { }
