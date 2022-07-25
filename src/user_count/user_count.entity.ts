import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//ORM사용을 위한 Entity 정의
@Entity()
export class UserCount extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quiz: number; //퀴즈 응시자 수

    @Column()
    share: number; //퀴즈 결과 공유자 수
}