import { flag } from "flags/next";

// ─────────────────────────────────────────────────────────────
// Feature Flag Definitions for Adire by Regalia
// Managed via the Vercel Dashboard (Flags → your project)
//
// The Vercel adapter evaluates flags using the FLAGS env var
// that Vercel auto-injects at deploy time. Each flag has a
// defaultValue that serves as fallback when the provider is
// unreachable or flags haven't been configured yet.
// ─────────────────────────────────────────────────────────────

// The adapter is only available when Vercel provides the FLAGS env var.
// Locally (without `vercel env pull`), flags use their defaultValue.
function getAdapter() {
    if (process.env.FLAGS) {
        // Dynamic import avoids @vercel/flags-core crashing on missing FLAGS env
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { vercelAdapter } = require("@flags-sdk/vercel");
        return vercelAdapter();
    }
    return undefined;
}

const adapter = getAdapter();

/**
 * Toggle the redesigned hero banner on the homepage
 */
export const showNewHeroBanner = flag<boolean>({
    key: "new-hero-banner",
    description: "Show the redesigned hero banner on the homepage",
    defaultValue: false,
    ...(adapter && { adapter }),
});

/**
 * Gate the AI virtual try-on feature on product detail pages
 */
export const showAiTryon = flag<boolean>({
    key: "ai-tryon",
    description: "Enable AI virtual try-on on product pages",
    defaultValue: false,
    ...(adapter && { adapter }),
});

/**
 * Enable Apple Pay / Google Pay express checkout
 */
export const showExpressCheckout = flag<boolean>({
    key: "express-checkout",
    description: "Enable express checkout options (Apple Pay, Google Pay)",
    defaultValue: false,
    ...(adapter && { adapter }),
});

/**
 * Show loyalty points and rewards UI across the storefront
 */
export const showLoyaltyProgram = flag<boolean>({
    key: "loyalty-program",
    description: "Show loyalty points and rewards program UI",
    defaultValue: false,
    ...(adapter && { adapter }),
});

/**
 * Enable customer reviews and ratings on product detail pages
 */
export const showProductReviews = flag<boolean>({
    key: "product-reviews",
    description: "Enable customer reviews and ratings on product pages",
    defaultValue: false,
    ...(adapter && { adapter }),
});

/**
 * A/B test homepage layout variant
 */
export const homepageLayout = flag<string>({
    key: "homepage-layout",
    description: "A/B test homepage layout variant",
    defaultValue: "default",
    options: [
        { value: "default", label: "Default Layout" },
        { value: "editorial", label: "Editorial Layout" },
    ],
    ...(adapter && { adapter }),
});

/**
 * Enable custom/personalized product selection feature
 * Allows customers to customize Adire patterns, colors, and designs
 */
export const showCustomizedProducts = flag<boolean>({
    key: "customized-product-selection",
    description:
        "Enable customized product selection — let customers personalize Adire patterns and designs",
    defaultValue: false,
    ...(adapter && { adapter }),
});
