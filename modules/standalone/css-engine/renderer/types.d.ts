export {};

declare global
{
  type CssRenderState = { output: Record<string, string[]> };
}