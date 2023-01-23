import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';
import { Interval } from 'luxon';

export const IntervalScalar = new GraphQLScalarType({
    name: 'Interval',
    description: 'An ISO 8601 encoded interval string.',
    serialize(value: unknown): string {
        if (value instanceof Interval)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid Interval: ${value}`);
    },
    parseValue(value: unknown): Interval {
        if (typeof value === 'string')
            return Interval.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Interval: ${value}`);
    },
    parseLiteral(ast): Interval {
        if (ast.kind === Kind.STRING)
            return Interval.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Interval but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class IntervalScalar extends SchemaType {
        public static instance = 'IntervalScalar';

        constructor(key: string, options: any) {
            super(key, options, 'IntervalScalar');
        }

        cast(value: unknown): Interval {
            if (typeof value === 'string')
                return Interval.fromISO(value);
            throw new Error(`Value is not a valid string for Interval: ${value}`);
        }
    }
    Schema.Types.IntervalScalar = IntervalScalar;
}

export { Interval };