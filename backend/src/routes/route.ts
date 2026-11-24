import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { createShortCode, findOriginalUrl } from "../services/url.service.js";

interface RootResponse {
    message: string;
    status: "success";
}

interface ShortenResponse {
    originalUrl: string;
    shortUrl: string;
}

interface ErrorResponse {
    error: string;
}

const shortenRequestSchema = z.object({
    url: z.string().url().refine(
        (value) => value.startsWith("http://") || value.startsWith("https://"),
        "URL must use http or https",
    ),
});

const router = Router();

router.get("/", (_req, res: Response<RootResponse>) => {
    res.json({
        message: "Backend is running!",
        status: "success",
    });
});

router.post(
    "/shorten",
    async (req: Request, res: Response<ShortenResponse | ErrorResponse>) => {
        const parsedRequest = shortenRequestSchema.safeParse(req.body);

        if (!parsedRequest.success) {
            res.status(400).json({
                error: parsedRequest.error.issues[0]?.message ?? "A valid URL is required.",
            });
            return;
        }

        const { url } = parsedRequest.data;
        const code = await createShortCode(url);

        res.status(201).json({
            originalUrl: url,
            shortUrl: `${req.protocol}://${req.get("host")}/${code}`,
        });
    },
);

router.get(
    "/:code",
    async (req: Request<{ code: string }>, res: Response<ErrorResponse>) => {
        const url = await findOriginalUrl(req.params.code);

        if (!url) {
            res.status(404).json({ error: "Short URL not found." });
            return;
        }

        res.redirect(url);
    },
);

export default router;
