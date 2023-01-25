import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';

export const PHONE_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;

export const PhoneNumberScalar = new GraphQLScalarType({
    name: 'PhoneNumber',
    description: 'A phone number of standard E.164 (example:: +17895551234).',
    serialize(value: unknown): string {
        if (typeof value === 'string' && PHONE_NUMBER_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid phone number: ${value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string' && PHONE_NUMBER_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid phone number: ${value}`);
    },
    parseLiteral(ast): string {
        if (ast.kind === Kind.STRING && PHONE_NUMBER_REGEX.test(ast.value))
            return ast.value;
        throw new GraphQLError(`Can only validate strings as phone numberes but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class PhoneNumberScalar extends SchemaType {
        public static instance = 'PhoneNumberScalar';

        constructor(key: string, options: any) {
            super(key, options, 'PhoneNumberScalar');
        }

        cast(value: unknown): string {
            if (typeof value === 'string' && PHONE_NUMBER_REGEX.test(value))
                return value;
            throw new Error(`Value is not a valid email address: ${value}`);
        }
    }
    Schema.Types.PhoneNumberScalar = PhoneNumberScalar;
}