import { randomBytes } from "node:crypto";
import Url from "../models/url.model.js";

function isDuplicateKeyError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
    );
}

export async function createShortCode(url: string): Promise<string> {
    const existingUrl = await Url.findOne({ originalUrl: url }).lean();

    if (existingUrl) {
        return existingUrl.shortCode;
    }

    while (true) {
        const shortCode = randomBytes(5).toString("hex");

        try {
            const record = await Url.create({ originalUrl: url, shortCode });
            return record.shortCode;
        } catch (error) {
            if (!isDuplicateKeyError(error)) {
                throw error;
            }

            const existingRecord = await Url.findOne({ originalUrl: url }).lean();
            if (existingRecord) {
                return existingRecord.shortCode;
            }
        }
    }
}

export async function findOriginalUrl(code: string): Promise<string | undefined> {
    const record = await Url.findOne({ shortCode: code }).lean();
    return record?.originalUrl;
}
