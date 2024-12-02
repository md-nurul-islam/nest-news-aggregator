import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./articles.entity";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articlesRepository: Repository<Article>
    ) {}

    async saveArticles(article: any[]): Promise<void> {
        try {
            await this.articlesRepository.save(article);
        } catch (error) {
            throw new Error(error);
        }
    }

    // : Promise<Article[]>
    async findArticles(keyword?: string, date?: string) {
        const query = await this.articlesRepository.createQueryBuilder('article');
        if (keyword) query.andWhere('article.title LIKE :keyword', {keyword: `%${keyword}%`});
        if (date) query.andWhere("article.publishe_date = '" + date + "'");

        return query.getMany();
    }
}
