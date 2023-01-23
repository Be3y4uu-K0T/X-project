import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';

export const URLScalar = new GraphQLScalarType({
    name: 'URL',
    description: 'A URL string is specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',
    serialize(value: unknown): string {
        if (value instanceof URL)
            return value.toString();
        throw new GraphQLError(`Value is not a valid URL: ${value}`);
    },
    parseValue(value: unknown): URL {
        if (typeof value === 'string')
            return new URL(value);
        throw new GraphQLError(`Value is not a valid string for URL: ${value}`);
    },
    parseLiteral(ast): URL {
        if (ast.kind === Kind.STRING)
            return new URL(ast.value);
        throw new GraphQLError(`Can only validate strings as DateTime but got a: ${ast.kind}`, { nodes: ast });
    }
});

namespace _ {
    export class URLScalar extends SchemaType {
        public static instance = 'URLScalar';

        constructor(key: string, options: any) {
            super(key, options, 'URLScalar');
        }

        cast(value: unknown): URL {
            if (typeof value === 'string')
                return new URL(value);
            throw new Error(`Value is not a valid string for DateTime: ${value}`);
        }
    }

    Schema.Types.URLScalar = URLScalar;
}