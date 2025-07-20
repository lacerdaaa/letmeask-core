import postgres from "postgres";
import { env } from "../src/env.ts";

const client = postgres(env.DATABASE_URL)