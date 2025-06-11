export {};

declare global
{
  namespace CssEngine
  {
    type RenderState = { output: Record<string, string[]> };
  }
}