import { type FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = async (app) => {
    app.post(
        '/rooms/:roomId/question',
        {
            schema: {
                body: z.object({
                    question: z.string().min(1),
                })
            }
        },
        async (request, reply) => {
            const { roomId } = request.params as { roomId: string };
            const { question } = request.body

            const result = await db.insert(schema.question).values({
                roomId: roomId,
                question: question,
            }).returning();

            const insertedQuestion = result[0];

            if (!result[0]) {
                throw new Error('Failed to create room');
            };

            return reply.status(201).send({ roomId: insertedQuestion.id })
        }
    );
};