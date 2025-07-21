import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./room.ts";

export const question = pgTable("question", {
    id: uuid("id").primaryKey(),
    roomId: uuid().references(() => rooms.id).notNull(),
    question: text().notNull(),
    answer: text(),
    createdAt: timestamp().defaultNow().notNull(),
})