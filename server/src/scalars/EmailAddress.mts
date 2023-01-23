import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { Schema, SchemaType } from 'mongoose';

const EMAIL_ADDRESS_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const EmailAddressScalar = new GraphQLScalarType({
    name: 'EmailAddress',
    description: 'A RFC 1123 encoded email address string.',
    serialize(value: unknown): string {
        if (typeof value === 'string' && EMAIL_ADDRESS_REGEXP.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid email address: ${value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string' && EMAIL_ADDRESS_REGEXP.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid email address: ${value}`);
    },
    parseLiteral(ast): string {
        if (ast.kind === Kind.STRING && EMAIL_ADDRESS_REGEXP.test(ast.value))
            return ast.value;
        throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`, { nodes: ast });
    },
});

namespace _ {
    export class EmailAddressScalar extends SchemaType {
        public static instance = 'EmailAddressScalar';

        constructor(key: string, options: any) {
            super(key, options, 'EmailAddressScalar');
        }

        cast(value: unknown): string {
            if (typeof value === 'string' && EMAIL_ADDRESS_REGEXP.test(value))
                return value;
            throw new Error(`Value is not a valid email address: ${value}`);
        }
    }
    Schema.Types.EmailAddressScalar = EmailAddressScalar;
}