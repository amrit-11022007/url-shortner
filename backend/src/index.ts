import { connectToDatabase } from "./config/database.js";
import { config } from "./config/env.js";
import app from "./app.js";

async function startServer(): Promise<void> {
    await connectToDatabase();

    app.listen(config.port, () => {
        console.log(`Server is listening at http://localhost:${config.port}`);
    });
}

startServer().catch((error: unknown) => {
    console.error("Failed to start the backend:", error);
    process.exitCode = 1;
});
