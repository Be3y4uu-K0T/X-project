/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetEvents($take: Int!, $page: Int!) {\n    events: tourist_events(take: $take, page: $page) {\n      _id\n      name\n      description\n      rating {\n        score\n      }\n      guide {\n        _id\n        avatar {\n          _id\n          url\n          mimetype\n        }\n        rating {\n          score\n        }\n        fullname\n      }\n      timing\n      price\n    }\n  }\n": types.GetEventsDocument,
    "\nmutation SignUpAsClient($email: EmailAddress!, $password: String!) {\n    signup_as_client(email: $email, password: $password) {\n      _id\n      avatar {\n        _id\n        url\n        filename\n        mimetype\n        size\n      }\n      created_at\n      email\n      contact {\n        address {\n          country\n          subject\n          district\n          locality {\n            type\n            designation\n          }\n          street {\n            type\n            designation\n          }\n          building {\n            type\n            designation\n          }\n          additional {\n            type\n            designation\n          }\n          apartament\n        }\n        location {\n          latitude\n          longitude\n        }\n        phone\n        email\n      }\n      lastaname\n      middlename\n      firstname\n      fullname\n      birthday\n    }\n}": types.SignUpAsClientDocument,
    "\nmutation SignIn($email: EmailAddress!, $password: String!) {\n  signin(email: $email, password: $password) {\n    sessionId\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignInDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEvents($take: Int!, $page: Int!) {\n    events: tourist_events(take: $take, page: $page) {\n      _id\n      name\n      description\n      rating {\n        score\n      }\n      guide {\n        _id\n        avatar {\n          _id\n          url\n          mimetype\n        }\n        rating {\n          score\n        }\n        fullname\n      }\n      timing\n      price\n    }\n  }\n"): (typeof documents)["\n  query GetEvents($take: Int!, $page: Int!) {\n    events: tourist_events(take: $take, page: $page) {\n      _id\n      name\n      description\n      rating {\n        score\n      }\n      guide {\n        _id\n        avatar {\n          _id\n          url\n          mimetype\n        }\n        rating {\n          score\n        }\n        fullname\n      }\n      timing\n      price\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SignUpAsClient($email: EmailAddress!, $password: String!) {\n    signup_as_client(email: $email, password: $password) {\n      _id\n      avatar {\n        _id\n        url\n        filename\n        mimetype\n        size\n      }\n      created_at\n      email\n      contact {\n        address {\n          country\n          subject\n          district\n          locality {\n            type\n            designation\n          }\n          street {\n            type\n            designation\n          }\n          building {\n            type\n            designation\n          }\n          additional {\n            type\n            designation\n          }\n          apartament\n        }\n        location {\n          latitude\n          longitude\n        }\n        phone\n        email\n      }\n      lastaname\n      middlename\n      firstname\n      fullname\n      birthday\n    }\n}"): (typeof documents)["\nmutation SignUpAsClient($email: EmailAddress!, $password: String!) {\n    signup_as_client(email: $email, password: $password) {\n      _id\n      avatar {\n        _id\n        url\n        filename\n        mimetype\n        size\n      }\n      created_at\n      email\n      contact {\n        address {\n          country\n          subject\n          district\n          locality {\n            type\n            designation\n          }\n          street {\n            type\n            designation\n          }\n          building {\n            type\n            designation\n          }\n          additional {\n            type\n            designation\n          }\n          apartament\n        }\n        location {\n          latitude\n          longitude\n        }\n        phone\n        email\n      }\n      lastaname\n      middlename\n      firstname\n      fullname\n      birthday\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SignIn($email: EmailAddress!, $password: String!) {\n  signin(email: $email, password: $password) {\n    sessionId\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["\nmutation SignIn($email: EmailAddress!, $password: String!) {\n  signin(email: $email, password: $password) {\n    sessionId\n    tokens {\n      accessToken\n      refreshToken\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;