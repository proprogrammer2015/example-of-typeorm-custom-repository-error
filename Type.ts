import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    name: string;
}
