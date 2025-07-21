import { type FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { eq, desc } from 'drizzle-orm';

export const getRoomsQuestions: FastifyPluginCallbackZod = async (app) => {
    app.get('/rooms/:roomId/questions', {
        schema: {
            params: z.object({
                roomId: z.string(),
            })
        }
    }, async (request) => {
        const { roomId } = request.params;

        const results = await db.select({
            id: schema.question.id,
            roomId: schema.question.roomId,
            question: schema.question.question,
            answer: schema.question.answer,
            createdAt: schema.question.createdAt,
        }).from(schema.question).where(eq(schema.question.roomId, roomId)).orderBy(desc(schema.question.createdAt));

        return results;
    });
};