import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleTable1732778550274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE article (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(500) NULL,
                description LONGTEXT NULL,
                publishe_date VARCHAR(20) NULL,
                source_url TEXT(500) NULL,
                topics LONGTEXT NULL,
                creator VARCHAR(255) NULL,
                created_at DATETIME NOT NULL DEFAULT NOW(),
                PRIMARY KEY (id),
                INDEX idx_title (title ASC) VISIBLE,
                INDEX idx_publishe_date (publishe_date ASC) VISIBLE
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS article;`
        );
    }
}
