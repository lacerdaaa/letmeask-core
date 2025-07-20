import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import { env } from './env.ts';
import {
    type ZodTypeProvider,
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';
import { getRoomsRoute } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler),
app.setValidatorCompiler(validatorCompiler);

app.get('/health-check', () => {
    return { status: 'ok' };
});

app.register(
    getRoomsRoute
)

app.listen({ port: env.PORT }).then(() => console.log(`HTTP Server running on port ${env.PORT}.`));