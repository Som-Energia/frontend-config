import type { ConfigEnv, UserConfig, UserConfigFn } from 'vite'

export interface VendorChunk {
  /** Output chunk name (e.g. "vendor-react"). */
  chunk: string
  /** Substrings matched against the module id to assign it to this chunk. */
  includes: string[]
}

/**
 * Pre-defined vendor chunk groups.
 * Extend them by passing additional chunks to {@link createManualChunks}.
 */
export declare const defaultVendorChunks: VendorChunk[]

/**
 * Returns a Rollup `manualChunks` function that groups node_modules
 * dependencies into per-vendor chunks.
 *
 * @param extraChunks - Additional chunks checked **before** the defaults.
 *                      Useful for project-specific packages (lodash, formik…).
 * @param args - Optional args to ignore the defaults chunks.
 *
 */
export declare function createManualChunks(
  extraChunks?: VendorChunk[],
  args?: { ignoreDefaults?: boolean; logUnmatched?: boolean },
): (id: string) => string | undefined

/**
 * Creates a base Vite configuration for SPAs (web applications).
 *
 * Provides:
 * - `BASE_URL` loading from `.env` files
 * - Automatic vendor chunking via {@link createManualChunks}
 * - Vitest configuration with jsdom
 * - Dev server on port 3000
 *
 * @param factory - A project config object **or** a function `({ mode, command, env }) => config`.
 *                  Deep-merged on top of the shared defaults.
 *                  Pass `plugins` here: `[react(), svgr(), …]`
 *
 * @example
 * // vite.config.js
 * import { createAppConfig } from '@somenergia/frontend-config/vite'
 * import react from '@vitejs/plugin-react'
 * export default createAppConfig(({ mode }) => ({
 *   plugins: [react()],
 *   // project-specific overrides…
 * }))
 */
export declare function createAppConfig(
  factory?: UserConfig | ((env: ConfigEnv & { env: Record<string, string> }) => UserConfig),
): UserConfigFn
