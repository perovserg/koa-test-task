import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';

import routes from './routes';
import { init as messagingInit } from './lib/messaging.lib';

const app = new Koa();
const router = new Router();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo/mts-test-task';

mongoose.connect(MONGO_URI, { useNewUrlParser: true,  useFindAndModify: false, useCreateIndex: true})
    .then(() => console.log('DB connected!'))
    .catch((err) => console.error(`DB connection failure: ${err}`));


app.use(logger());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(BodyParser({
    enableTypes: ['json', 'form'],
    strict: true,
}));

routes(router);
app.use(router.routes());
app.use(router.allowedMethods());

const API_PORT = process.env.API_PORT || '3001';
app.listen(API_PORT, () => console.log(`Koa started on port ${API_PORT}`));

const messagingInterval = (process.env.MESSAGING_INTERVAL_SECONDS || 300) * 1000;
messagingInit(messagingInterval);
