// import { TypeConnection } from './TypeConnection';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { EntityRepository } from 'typeorm';
import { Type } from './Type';
import * as _ from 'lodash';

@EntityRepository()
export class TypeConnectionManager {
    constructor(private manager: EntityManager) { }

    // public getOrCreateIfAbsent(type1: string, type2: string): Promise<TypeConnection> {

    //     let t = new TypeConnection();
    //     t.type1 = null;
    //     t.type2 = null;

    //     return this.manager.save(null);
    // }

    public getTypes(typeName1: string, typeName2: string): Promise<Type[]> {
        if (_.isNil(typeName1)) {
            return Promise.resolve([null, null]);
        }

        return Promise.all([
            this.insertIfAbsent(typeName1),
            this.insertIfAbsent(typeName2)
        ]);
    }

    private async insertIfAbsent(name: string): Promise<Type> {
        if (_.isEmpty(name)) {
            return Promise.resolve(null);
        }

        let existingType: Type = await this.manager.findOne(Type, { name });

        if (_.isUndefined(existingType)) {
            let newType = new Type();
            newType.name = name;
            return this.manager.save(newType);
        }

        return Promise.resolve(existingType);
    }
}