import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { scalarsMap } from './scalars/scalars.mjs';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';
import express from 'express';
import mime from 'mime-types';
import multer from 'multer';
import 'reflect-metadata';
import http from 'http';
import cors from 'cors';
import path from 'path';
import './auth.mjs';

import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';

import {
    /* TODO */
    AttachmentModel,
    resolvers
} from './entites.mjs'

import {
    accounts_password,
    Context,
    context,
} from './auth.mjs';


const storage = multer.diskStorage({
    destination: './server/cdn',
    filename: async (req, file, callback) => {
        callback(null, (new ObjectId()).toHexString());
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 16*1024*1024, // FIXME: 16MiB
        fields: 0,
        files: 10,
        parts: 10,
    },
});


const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
    schema: await buildSchema({
        emitSchemaFile: './docs/schema.gql',
        resolvers: resolvers as any,
        validate: false,
        scalarsMap,
    }),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV! === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
});
await server.start();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// GraphQL
app.use('/api', cors<cors.CorsRequest>(), expressMiddleware<Context>(server, { context }));

app.use('/cdn', express.static(path.resolve('./server/cdn'), {
    fallthrough: false,
    setHeaders(res, path, stat) {
        res.type('application/unknown');
    },
}));
app.post('/cdn', upload.single('file'), async (req, res) => { // TODO: Add auth check.
    if (!req.file)
        return res.status(500).send('File is undefined.');

    const file = req.file;
    const size = file.size;
    const filename = file.originalname;
    const mimetype = mime.extension(file.mimetype) ? file.mimetype : mime.lookup(filename) || 'application/unknown';
    const url = `${req.protocol}://${req.get('host')}/cdn/${file.filename}`;
    const id = new ObjectId(file.filename);
    const document = new AttachmentModel({ id, url, filename, mimetype, size }); // TODO: Add user field.
    await document.save();
    return res.json({ id, url });
});

// React App
app.use('/', express.static(path.resolve('./client/build')));

// Verify Email
app.get('/verify-email/:token', async (req, res) => {
    try {
        await accounts_password.verifyEmail(req.params.token);
    } catch (error) {
        return res.json({ ok: false });
    }
    return res.json({ ok: true });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE')
            return res.status(415).send(err.code);
        if (err.code === 'LIMIT_FILE_SIZE')
            return res.status(413).send(err.code);
        return res.status(500).send(err.code);
    }
    return res.send(err.status || 500);
});

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server listening at: http://localhost:4000/`);