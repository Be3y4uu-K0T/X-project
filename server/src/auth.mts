import { EMAIL_ADDRESS_REGEXP } from './scalars/EmailAddress.mjs';
import { User as UserBase } from '@accounts/types/lib/types/user';
import { DatabaseManager } from '@accounts/database-manager';
import { AccountsPassword } from '@accounts/password';
import { AccountsServer } from '@accounts/server';
import { Mongo } from '@accounts/mongo';
import { Role } from './enums/Role.mjs';
import { connect } from 'mongoose';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';

const mongoose = await connect(process.env.MONGO_DB_URI!);
await mongoose.connection.db.stats();

const user_storage = new Mongo(mongoose.connection, {
    collectionName: 'auth_users',
    sessionCollectionName: 'auth_sessions',
});
const accounts_db = new DatabaseManager({ sessionStorage: user_storage, userStorage: user_storage });
const argon_options: argon2.Options & { raw?: false } = { type: argon2.argon2d, saltLength: 10 };
const transporter = nodemailer.createTransport({
    /* TODO */
});


export interface User extends UserBase {
    role: Role;
}

export const accounts_password = new AccountsPassword<User>({
    validateEmail: (email) => (typeof email === 'string' && EMAIL_ADDRESS_REGEXP.test(email)),
    hashPassword: (password) => argon2.hash(password, argon_options),
    verifyPassword: (password, hash) => argon2.verify(hash, password, argon_options),
    sendVerificationEmailAfterSignup: true,
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
                subject: (user?: UserBase) => `Verify your account email ${user?.username}`,
                text: (user: UserBase, url: string) => url, // FIXME: `To verify your account email please click on this link: ${url}`,
            }
        },
        siteUrl: `http://localhost:${process.env.PORT!}`,
    },
    {
        password: accounts_password
    }
);
