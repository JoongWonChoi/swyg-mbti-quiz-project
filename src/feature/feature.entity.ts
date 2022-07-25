import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feature extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mbti: string; //MBTI

    @Column()
    feature1: string; //특징1

    @Column()
    feature2: string; //특징2

    @Column()
    feature3: string; //특징3

    @Column()
    feature4: string; //특징4

    @Column()
    feature5: string; //특징5

}