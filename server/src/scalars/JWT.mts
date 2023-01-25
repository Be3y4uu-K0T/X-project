import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';

// See: https://github.com/auth0/node-jws/blob/master/lib/verify-stream.js#L8
export const JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

export const JWTScalar = new GraphQLScalarType({
    name: 'JWT',
    description: 'A JSON Web Token (JWT): https://jwt.io/introduction.',
    serialize(value: unknown): string {
        if (typeof value === 'string' && JWS_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid JSON Web Token: ${value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string' && JWS_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid string for JSON Web Token: ${value}`);
    },
    parseLiteral(ast): string {
        if (ast.kind === Kind.STRING && JWS_REGEX.test(ast.value))
            return ast.value;
        throw new GraphQLError(`Can only validate strings as JSON Web Token but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class JWTScalar extends SchemaType {
        public static instance = 'JWTScalar';

        constructor(key: string, options: any) {
            super(key, options, 'JWTScalar');
        }

        cast(value: unknown): string {
            if (typeof value === 'string' && JWS_REGEX.test(value))
                return value;
            throw new Error(`Value is not a valid string for Interval: ${value}`);
        }
    }
    Schema.Types.JWTScalar = JWTScalar;
}