import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';

// See https://en.wikipedia.org/wiki/Decimal_degrees#Precision
export const MAX_PRECISION = 8;

// Minimum latitude
export const MIN_LATITUDE = -90.0;
// Maximum latitude
export const MAX_LATITUDE = +90.0;

export const LatitudeScalar = new GraphQLScalarType({
    name: 'Latitude',
    description: 'A decimal degrees latitude number.',
    serialize(value: unknown): string {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value.toFixed(MAX_PRECISION);
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid latitude: ${value}`);
    },
    parseValue(value: unknown): number {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid latitude: ${value}`);
    },
    parseLiteral(ast): number {
        if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
            let value = Number.parseFloat(ast.value);
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Can only validate strings or numbers as latitude but got a: ${ast.kind}`, { nodes: ast });
    },
});

// Minimum longitude
export const MIN_LONGITUDE = -180.0;
// Maximum longitude
export const MAX_LONGITUDE = +180.0;

export const LongitudeScalar = new GraphQLScalarType({
    name: 'Longitude',
    description: 'A decimal degrees latitude number.',
    serialize(value: unknown): string {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value.toFixed(MAX_PRECISION);
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid longitude: ${value}`);
    },
    parseValue(value: unknown): number {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid longitude: ${value}`);
    },
    parseLiteral(ast): number {
        if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
            const value = Number.parseFloat(ast.value);
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Can only validate strings or numbers as longitude but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class LatitudeScalar extends SchemaType {
        public static instance = 'LatitudeScalar';

        constructor(key: string, options: any) {
            super(key, options, 'LatitudeScalar');
        }

        cast(value: unknown): number {
            if (typeof value === 'string')
                value = Number.parseFloat(value);
            if (typeof value === 'number' && !Number.isNaN(value)) {
                if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                    return value;
                throw new Error(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
            }
            throw new Error(`Value is not a valid longitude: ${value}`);
        }
    }
    Schema.Types.LatitudeScalar = LatitudeScalar;

    export class LongitudeScalar extends SchemaType {
        public static instance = 'LongitudeScalar';

        constructor(key: string, options: any) {
            super(key, options, 'LongitudeScalar');
        }

        cast(value: unknown): number {
            if (typeof value === 'string')
                value = Number.parseFloat(value);
            if (typeof value === 'number' && !Number.isNaN(value)) {
                if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                    return value;
                throw new Error(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
            }
            throw new Error(`Value is not a valid longitude: ${value}`);
        }
    }
    Schema.Types.LongitudeScalar = LongitudeScalar;
}