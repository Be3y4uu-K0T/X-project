import { CreateIndexesOptions } from 'mongodb';
import { ConnectionInformations, CreateUserServicePassword, DatabaseInterface, User, Session } from '@accounts/types';
import { AccountsMongoOptions } from '@accounts/mongo/lib/types';
export declare class Mongo<CustomUser extends User = User> implements DatabaseInterface<CustomUser> {
    private options;
    private db;
    private collection;
    private sessions;
    private servicePassword;
    private serviceMagicLink;
    constructor(db: any, options?: AccountsMongoOptions);
    /**
     * Setup the mongo indexes needed.
     * @param options Options passed to the mongo native `createIndex` method.
     */
    setupIndexes(options?: Omit<CreateIndexesOptions, 'unique' | 'sparse'>): Promise<void>;
    findUserById(userId: string): Promise<CustomUser | null>;
    createUser(user: CreateUserServicePassword): Promise<string>;
    findUserByEmail(email: string): Promise<CustomUser | null>;
    findUserByUsername(username: string): Promise<CustomUser | null>;
    findPasswordHash(userId: string): Promise<string | null>;
    findUserByEmailVerificationToken(token: string): Promise<CustomUser | null>;
    findUserByResetPasswordToken(token: string): Promise<CustomUser | null>;
    addEmail(userId: string, newEmail: string, verified: boolean): Promise<void>;
    removeEmail(userId: string, email: string): Promise<void>;
    verifyEmail(userId: string, email: string): Promise<void>;
    setUsername(userId: string, newUsername: string): Promise<void>;
    setPassword(userId: string, newPassword: string): Promise<void>;
    removeAllResetPasswordTokens(userId: string): Promise<void>;
    addEmailVerificationToken(userId: string, email: string, token: string): Promise<void>;
    addResetPasswordToken(userId: string, email: string, token: string, reason: string): Promise<void>;
    addLoginToken(userId: string, email: string, token: string): Promise<void>;
    findUserByLoginToken(token: string): Promise<CustomUser | null>;
    removeAllLoginTokens(userId: string): Promise<void>;
    createSession(userId: string, token: string, connection?: ConnectionInformations, extraData?: object): Promise<string>;
    findSessionById(sessionId: string): Promise<Session | null>;
    findSessionByToken(token: string): Promise<Session | null>;
    updateSession(sessionId: string, connection: ConnectionInformations, newToken?: string): Promise<void>;
    invalidateSession(sessionId: string): Promise<void>;
    invalidateAllSessions(userId: string, excludedSessionIds?: string[]): Promise<void>;
    findUserByServiceId(serviceName: string, serviceId: string): Promise<CustomUser | null>;
    setService(userId: string, serviceName: string, service: object): Promise<void>;
    unsetService(userId: string, serviceName: string): Promise<void>;
    setUserDeactivated(userId: string, deactivated: boolean): Promise<void>;
}
