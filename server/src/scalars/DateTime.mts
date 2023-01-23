import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';
import { DateTime } from 'luxon';

export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'An ISO-8601 encoded datetime string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid DateTime: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for DateTime: ${value}`);
    },
    parseLiteral(ast): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as DateTime but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'An ISO-8601 encoded date string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISODate();
        throw new GraphQLError(`Value is not a valid DateTime for Date: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Date: ${value}`);
    },
    parseLiteral(ast): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Date but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const TimeScalar = new GraphQLScalarType({
    name: 'Time',
    description: 'An ISO-8601 encoded time string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISOTime();
        throw new GraphQLError(`Value is not a valid DateTime for Time: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Time: ${value}`);
    },
    parseLiteral(ast): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Time but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class DateTimeScalar extends SchemaType {
        public static instance = 'DateTimeScalar';

        constructor(key: string, options: any) {
            super(key, options, 'DateTimeScalar');
        }

        cast(value: unknown): DateTime {
            if (typeof value === 'string')
                return DateTime.fromISO(value);
            throw new Error(`Value is not a valid string for DateTime: ${value}`);
        }
    }
    Schema.Types.DateTimeScalar = DateTimeScalar;
    Schema.Types.DateScalar = DateTimeScalar;
    Schema.Types.TimeScalar = DateTimeScalar;

}
export { DateTime };