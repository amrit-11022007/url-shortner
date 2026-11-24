"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: { shortUrl?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to shorten this URL.");
      }

      if (!data.shortUrl) {
        throw new Error("The server returned an invalid response.");
      }

      setShortUrl(data.shortUrl);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to connect to the URL shortening service.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to Yadav URL Shortening service
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            No competition out there in market
          </p>
        </div>
        <form
          className="flex w-full max-w-xl flex-col gap-3 text-base font-medium sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Enter URL..."
            aria-label="URL to shorten"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
            className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
          />
          <input
            type="submit"
            value={isSubmitting ? "Shortening..." : "Shorten"}
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-zinc-900 px-6 py-3 text-white shadow-sm transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-wait disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          />
        </form>
        {error && (
          <p className="w-full max-w-xl text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {shortUrl && (
          <p className="w-full max-w-xl break-all text-sm text-zinc-700 dark:text-zinc-300" role="status">
            Short URL:{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {shortUrl}
            </a>
          </p>
        )}
      </main>
    </div>
  );
}
