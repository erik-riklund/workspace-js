import { makeFileWatcher } from '.'

declare global
{
  type FileWatcher = ReturnType<typeof makeFileWatcher>;
  type FileWatcherOptions = { interval: number, debounce: number };
  type FileWatcherState = { callback: FileWatcherCallback, invoked: number };
  type FileWatcherCallback = (file: FileObject) => void;
  type TrackedFileState = { file: FileObject, modified: number };
}