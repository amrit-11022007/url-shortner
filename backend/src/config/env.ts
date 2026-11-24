import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({
    path: fileURLToPath(new URL("../../src/config/.env", import.meta.url)),
});

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    throw new Error("MONGODB_URI is required in backend/src/config/.env");
}

export const config = {
    mongoUri,
    port: Number(process.env.PORT ?? 8000),
};
