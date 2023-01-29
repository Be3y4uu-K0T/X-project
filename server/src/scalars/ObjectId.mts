import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const ObjectIdScalar = new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongodb object id scalar type',
    serialize(value: unknown): string {
        if (typeof value === 'string')
            return (new ObjectId(value)).toHexString()
        if (value instanceof ObjectId)
            return value.toHexString();
        throw new GraphQLError(`Value is not a valid mongodb ObjectId: ${value}`);
    },
    parseValue(value: unknown): ObjectId {
        if (typeof value === 'string')
            return new ObjectId(value);
        throw new GraphQLError(`Value is not a valid mongodb ObjectId: ${value}`);
    },
    parseLiteral(ast): ObjectId {
        if (ast.kind === Kind.STRING)
            return new ObjectId(ast.value);
        throw new GraphQLError(`Can only validate strings as ObjectId but got a: ${ast.kind}`, { nodes: ast });
    },
});

export { ObjectId };