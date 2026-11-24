import { randomBytes } from "node:crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { z } from "zod";
const app = express();
const PORT = 8000;
const urls = new Map();
const codesByUrl = new Map();
const shortenRequestSchema = z.object({
    url: z.string().url().refine((value) => value.startsWith("http://") || value.startsWith("https://"), "URL must use http or https"),
});
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/", (_req, res) => {
    res.json({
        message: "Backend is running!",
        status: "success"
    });
});
app.post("/shorten", (req, res) => {
    const parsedRequest = shortenRequestSchema.safeParse(req.body);
    if (!parsedRequest.success) {
        res.status(400).json({
            error: parsedRequest.error.issues[0]?.message ?? "A valid URL is required.",
        });
        return;
    }
    const { url } = parsedRequest.data;
    let code = codesByUrl.get(url);
    if (!code) {
        do {
            code = randomBytes(5).toString("hex");
        } while (urls.has(code));
        urls.set(code, url);
        codesByUrl.set(url, code);
    }
    res.status(201).json({
        originalUrl: url,
        shortUrl: `${req.protocol}://${req.get("host")}/${code}`,
    });
});
app.get("/:code", (req, res) => {
    const url = urls.get(req.params.code);
    if (!url) {
        res.status(404).json({ error: "Short URL not found." });
        return;
    }
    res.redirect(url);
});
app.listen(PORT, () => {
    console.log(`Server is listening at port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map