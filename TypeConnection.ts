import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Type } from './Type';

@Entity()
export class TypeConnection {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Type, { cascadeAll: true })
    @JoinColumn()
    type1: Type;

    @OneToOne(type => Type, { cascadeAll: true })
    @JoinColumn()
    type2: Type;
}
