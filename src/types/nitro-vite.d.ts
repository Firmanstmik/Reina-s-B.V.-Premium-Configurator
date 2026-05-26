declare module "nitro/vite" {
  import type { PluginOption } from "vite";

  export function nitro(...args: unknown[]): PluginOption;
}
