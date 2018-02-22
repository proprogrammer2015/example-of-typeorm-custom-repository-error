import test from 'ava';
import * as sinon from 'sinon';
import { TypeConnectionManager } from './TypeConnectionManager';
import { Type } from './Type';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

const createType = (id: number, typeName1: string): Promise<Type> => {
    let type1 = new Type();
    type1.name = typeName1;
    type1.id = id;
    return Promise.resolve(type1);
};

const getConnection = async (em: EntityManager, typeName1: string, typeName2: string): Promise<Type[]> => {
    let manager = new TypeConnectionManager(em);
    return await manager.getTypes(typeName1, typeName2);
};

test.beforeEach('set up existing type connections', t => {
    let em = sinon.createStubInstance(EntityManager);

    em.findOne.withArgs(Type, { name: 'A' }).returns(createType(1, 'A'));
    em.findOne.withArgs(Type, { name: 'B' }).returns(createType(2, 'B'));
    em.findOne.withArgs(Type, { name: 'C' }).returns(createType(3, 'C'));
    em.findOne.withArgs(Type, { name: '' }).returns(Promise.resolve(undefined));

    em.save.withArgs({ name: 'D' }).returns(createType(20, 'D'));
    em.save.withArgs({ name: 'E' }).returns(createType(21, 'E'));

    t.context.data = em;
});

test('should return existing types of pair A->B', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'A', 'B');

    t.is(t1.id, 1);
    t.is(t1.name, 'A');

    t.is(t2.id, 2);
    t.is(t2.name, 'B');
});

test('should return new types of new pair D->E', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'D', 'E');

    t.is(t1.id, 20);
    t.is(t1.name, 'D');

    t.is(t2.id, 21);
    t.is(t2.name, 'E');
});

test('should return one new type and one already existing of new pair A->E', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'A', 'E');

    t.is(t1.id, 1);
    t.is(t1.name, 'A');

    t.is(t2.id, 21);
    t.is(t2.name, 'E');
});

test('should return already existing of new pair A->NULL', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'A', null);

    t.is(t1.id, 1);
    t.is(t1.name, 'A');

    t.is(t2, null);
});

test('should return new pair E->NULL', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'E', null);

    t.is(t1.id, 21);
    t.is(t1.name, 'E');

    t.is(t2, null);
});

test('should not create new type if type2 is empty string', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'E', '');

    t.is(t1.id, 21);
    t.is(t1.name, 'E');

    t.is(t2, null);
});

test('should not create new type if type1 is empty string', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, '', 'E');

    t.is(t1, null);

    t.is(t2.id, 21);
    t.is(t2.name, 'E');
});

test('should return already existing of new pair A->undefined', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, 'A', void 0);

    t.is(t1.id, 1);
    t.is(t1.name, 'A');

    t.is(t2, null);
});

test('should return null pair if type1 is null', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, null, 'A');

    t.is(t1, null);
    t.is(t2, null);
});

test('should return null pair if type1 is undefined', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, void 0, 'A');

    t.is(t1, null);
    t.is(t2, null);
});

test('should return null pair if both types are null', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, null, null);

    t.is(t1, null);
    t.is(t2, null);
});

test('should return null pair if both types are undefined', async t => {
    let [t1, t2]: Type[] = await getConnection(t.context.data, void 0, void 0);

    t.is(t1, null);
    t.is(t2, null);
});