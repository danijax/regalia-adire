import { NextResponse } from "next/server";
import { createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "@/lib/flags";

/**
 * Flags Explorer discovery endpoint.
 * The Vercel toolbar uses this to discover available flags
 * and allow per-session overrides during development / preview.
 *
 * Endpoint: GET /.well-known/vercel/flags
 * Secured automatically via the FLAGS_SECRET environment variable.
 *
 * When Vercel provides the FLAGS env var (on deploy), this uses
 * the Vercel provider data. In local dev, it falls back to a
 * basic JSON response listing the flag definitions.
 */
let handler: ((req: any) => Promise<Response>) | undefined;

try {
    if (process.env.FLAGS) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { getProviderData } = require("@flags-sdk/vercel");
        handler = createFlagsDiscoveryEndpoint(async () => {
            return getProviderData(flags);
        });
    }
} catch {
    // Swallow errors when @flags-sdk/vercel can't initialize
}

export async function GET(req: Request) {
    if (handler) {
        return handler(req);
    }
    // Fallback for local dev without FLAGS env var
    return NextResponse.json({
        definitions: Object.entries(flags)
            .filter(([, v]) => typeof v === "function")
            .map(([name]) => ({ name })),
    });
}
