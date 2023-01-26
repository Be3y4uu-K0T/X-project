import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { EMAIL_ADDRESS_REGEXP } from './scalars/EmailAddress.mjs';
import type { ContextFunction } from '@apollo/server';
import { AccountsPassword } from '@accounts/password';
import { User } from '@accounts/types/lib/types/user';
import { AccountsServer } from '@accounts/server';
import { getClientIp } from 'request-ip';
import { Mongo } from '@accounts/mongo';
import { connect } from 'mongoose';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';

const mongoose = await connect(process.env.MONGO_DB_URI!);
await mongoose.connection.db.stats();

const accounts_db = new Mongo(mongoose.connection, {
    collectionName: 'auth_users',
    sessionCollectionName: 'auth_sessions',
});
const argon_options: argon2.Options & { raw?: false } = { type: argon2.argon2d, saltLength: 10 };
const transporter = nodemailer.createTransport({
    /* TODO */
});

export interface Context {
    id?: string;
    user?: User;
    token?: string;
    ip?: string;
    userAgent?: string;
}

export const context: ContextFunction<[ExpressContextFunctionArgument], Context> = async ({ req, res }) => {
    const auth = req.headers.authorization;
    const token = auth?.startsWith('Bearer ') && auth.replace('Bearer ', '') || undefined;
    let user: User | undefined;
    try {
        // TS-BUG: `user = token && await (...)` will return typeof user is `"" | User | undefined`
        // But "" is impossible, even after assert check: `assert(token !== '')`!
        if (token) user = await accounts_server.resumeSession(token);
    } catch (error) { /* ... */ }

    const ip = getClientIp(req) ?? undefined;
    let userAgent = req.headers['user-agent'];
    if (req.headers['x-ucbrowser-ua']) {
      userAgent = req.headers['x-ucbrowser-ua'] as string; // special case of UC Browser
    }

    return {
        id: user && user.id,
        token,
        user,
        ip,
        userAgent,
    };
};

export const accounts_password = new AccountsPassword({
    validateEmail: (email) => (typeof email === 'string' && EMAIL_ADDRESS_REGEXP.test(email)),
    hashPassword: (password) => argon2.hash(password, argon_options),
    verifyPassword: (password, hash) => argon2.verify(hash, password, argon_options),
    sendVerificationEmailAfterSignup: true,
    validateNewUser: (user) => user,
});

export const accounts_server = new AccountsServer(
    {
        db: accounts_db,
        tokenSecret: {
            publicKey: process.env.JWT_PUBLIC_KEY!,
            privateKey: process.env.JWT_PRIVATE_KEY!,
        },
        tokenConfigs: {
            accessToken: {
                expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME!
            },
            refreshToken: {
                expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME!
            },
        },
        sendMail: async (email: any) => {
            const token: string = email?.text.replace('http://localhost:4000/verify-email/', ''); // HACK
            await accounts_password.verifyEmail(token); // HACK
            // await transporter.sendMail({ ...email }); // FIXME
        },
        emailTemplates: {
            from: 'x-project <no-reply@x-project.com>',
            verifyEmail: {
                subject: (user?: User) => `Verify your account email ${user?.username}`,
                text: (user: User, url: string) => url, // FIXME: `To verify your account email please click on this link: ${url}`,
            }
        },
        createJwtPayload: async (data, user) => {
            return {
                role: (user as any).role // TODO: Problem with generic `CustomUser` and `Mongo`
            }
        },
        siteUrl: `http://localhost:${process.env.PORT!}`,
    },
    {
        password: accounts_password
    }
);
