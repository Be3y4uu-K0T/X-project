import dotenv from 'dotenv'; dotenv.config();
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { connect } from 'mongoose';
import bodyparser from 'body-parser';
import express from 'express';
import mime from 'mime-types';
import multer from 'multer';
import 'reflect-metadata';
import http from 'http';
import cors from 'cors';
import path from 'path';

import {
    /* TODO */
    AttachmentModel,
    AttachmentResolver,
    scalarsMap,
} from './entites.mjs'


interface Context {
    req: express.Request;
    res: express.Response;
    token?: string;
}

const storage = multer.diskStorage({
    destination: './server/cdn',
    filename: async (req, file, callback) => {
        callback(null, (new ObjectId()).toHexString());
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 16*1024*1024, // 16MiB
        fields: 0,
        files: 10,
        parts: 10,
    },
});


const mongoose = await connect(process.env.DB_URI!);
await mongoose.connection.db.stats();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
    schema: await buildSchema({
        resolvers: [AttachmentResolver],
        emitSchemaFile: '../docs/schema.gql',
        validate: false,
        scalarsMap,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', cors<cors.CorsRequest>(),
    expressMiddleware<Context>(server, {
        context: async ({ req, res }) => {
            const token = req.headers.authorization ?? ''; // TODO: Add auth.
            return { req, res, token: req.headers.authorization };
        },
    }),
);

app.use('/cdn', express.static(path.resolve('./server/cdn'), {
    setHeaders(res, path, stat) {
        res.type('application/unknown');
    },
}));

app.use('/cdn/*', async (req, res) => { return res.status(404).send('Cannot find file.')});
app.post('/cdn', upload.single('file'), async (req, res) => { // TODO: Add auth check.
    if (!req.file)
        return res.status(500).send('File is undefined.');

    const file = req.file;
    const size = file.size;
    const filename = file.originalname;
    const mimetype = mime.extension(file.mimetype) ? file.mimetype : mime.lookup(filename) || 'application/unknown';
    const url = `${req.protocol}://${req.get('host')}/cdn/${file.filename}`;
    const _id = ObjectId.createFromHexString(file.filename);
    const document = await AttachmentModel.create({ _id, url, filename, mimetype, size }); // TODO: Add user field.
    await document.save();
    res.json({ url });
});

// TODO
app.use(express.static(path.resolve('./client/build')));
app.use(express.static(path.resolve('./client/public')));

app.use((req, res, next) => {
    res.sendFile(path.resolve('./client/build/index.html'));
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE')
            return res.status(415).send(err.code);
        if (err.code === 'LIMIT_FILE_SIZE')
            return res.status(413).send(err.code);
        return res.status(500).send(err.code);
    }
    next(err);
});

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server listening at: http://localhost:4000/`);