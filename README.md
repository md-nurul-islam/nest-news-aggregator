<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A News Aggregator application built with NestJS.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://x.com/webdev_nislam" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  
## Description
The project is created with NodeJS v23.0.0, NestJS and TypeScript. Implemented AWS Comprehend (Machine Learnig) and S3 for topic modeling. [natural](https://github.com/NaturalNode/natural) is used for topic extraction. This project reads all configurations from `.env`. However `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION` should be exported to system environment like the following. `aws-sdk` will read the configurations from there.

```bash
$ export AWS_ACCESS_KEY_ID={AWS_ACCESS_KEY_ID}
$ export AWS_SECRET_ACCESS_KEY={AWS_SECRET_ACCESS_KEY}
$ export AWS_REGION={AWS_REGION}
```
MySQL database is used as the primary database along with TypeORM. `Nest Scheduler` will fetch the RSS feed in every 1 hour from the designated RSS URL set in environment and store in the database.

```bash
GET /articles
```
will fetch articles from the database and return in JSON format through a REST API. No authentication is required at the moment. However, the list is possible to filter by keyword and publish date.

Swagger API documentation is available at 

```bash
GET /api/#/articles
```

## Project setup

```bash
$ cp .env.example .env

$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

## Resources

```SQL
-- in case the migration does not work
CREATE TABLE `article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NULL,
  `description` LONGTEXT NULL,
  `publishe_date` VARCHAR(20) NULL,
  `source_url` TEXT(500) NULL,
  `topics` LONGTEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `idx_title` (`title` ASC) VISIBLE,
  INDEX `idx_publishe_date` (`publishe_date` ASC) VISIBLE
  );
  ```

## Stay in touch

- Twitter - [Nurul Islam](https://x.com/webdev_nislam)
- GitHub - [Nurul Islam](https://github.com/md-nurul-islam)
- LinkedIn - [Nurul Islam](https://www.linkedin.com/in/md-nurul-slam/)
- Email - [webdev.nislam@gmail.com](mailto:webdev.nislam@gmail.com)