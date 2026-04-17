import type { ConfigEnv, UserConfig, UserConfigFn } from 'vite'

export interface VendorChunk {
  /** Output chunk name (e.g. "vendor-react"). */
  chunk: string
  /** Substrings matched against the module id to assign it to this chunk. */
  includes: string[]
}

/** Pre-defined vendor chunks for MUI, React, charts, i18n and @somenergia. */
export declare const defaultVendorChunks: VendorChunk[]

/**
 * Returns a Rollup `manualChunks` function that groups node_modules into
 * per-vendor chunks.
 *
 * @param extraChunks - Additional chunks checked before the defaults.
 */
export declare function createManualChunks(
  extraChunks?: VendorChunk[],
): (id: string) => string | undefined

/**
 * Creates a base Vite configuration for SPAs.
 *
 * @param factory - A project config object or a function that receives
 *                  `{ mode, command }` and returns one. Deep-merged on top
 *                  of the shared defaults.
 */
export declare function createAppConfig(
  factory?: UserConfig | ((env: ConfigEnv) => UserConfig),
): UserConfigFn
