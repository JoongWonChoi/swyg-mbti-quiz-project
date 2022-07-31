import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuizScore extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userMbti: string; //사용자 mbti

    @Column()
    quizMbti: string; //퀴즈 대상 mbti

    @Column()
    score: number; //퀴즈 점수

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

}