import { model, Schema } from "mongoose";

interface UrlDocument {
    originalUrl: string;
    shortCode: string;
}

const urlSchema = new Schema<UrlDocument>(
    {
        originalUrl: { type: String, required: true, unique: true },
        shortCode: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

const Url = model<UrlDocument>("Url", urlSchema);

export default Url;
