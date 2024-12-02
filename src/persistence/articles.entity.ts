import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    creator: string;

    @Column()
    description: string;

    @Column({name: 'publishe_date'})
    publisheDate: string;

    @Column({name: 'source_url'})
    sourceUrl: string;

    @Column()
    topics: string;
}
