import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';
import { Duration } from 'luxon';

export const DurationScalar = new GraphQLScalarType({
    name: 'Duration',
    description: 'An ISO 8601 encoded duration string.',
    serialize(value: unknown): string {
        if (value instanceof Duration)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid Duration: ${value}`);
    },
    parseValue(value: unknown): Duration {
        if (typeof value === 'string')
            return Duration.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Duration: ${value}`);
    },
    parseLiteral(ast): Duration {
        if (ast.kind === Kind.STRING)
            return Duration.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Duration but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class DurationScalar extends SchemaType {
        public static instance = 'DurationScalar';

        constructor(key: string, options: any) {
            super(key, options, 'DurationScalar');
        }

        cast(value: unknown): Duration {
            if (typeof value === 'string')
                return Duration.fromISO(value);
            throw new Error(`Value is not a valid string for Duration: ${value}`);
        }
    }
    Schema.Types.DurationScalar = DurationScalar;
}

export { Duration };