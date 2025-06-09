import { makePathFilter } from '.'

declare global
{
  /**
   * Represents a function that filters an array of file paths based
   * on a precompiled pattern, returning only the entries that match.
   */
  type PathFilter = ReturnType<typeof makePathFilter>;
}