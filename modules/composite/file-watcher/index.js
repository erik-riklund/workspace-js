import { makePathFilter } from 'module/path-filter'

/**
 * Creates a file watcher using the provided folder object and pattern.
 * 
 * @param {FolderObject} folder
 * @param {string} pattern
 * @param {Partial<FileWatcherOptions>} options
 */
export const makeFileWatcher = (folder, pattern, options = {}) =>
{
  options = { interval: 500, debounce: 100, ...options };

  /** @type {Record<string, FileWatcherState[]>} */
  const watchers = { create: [], change: [], delete: [] };
  const trackedFiles = { current: {}, previous: {} };

  const filterPaths = makePathFilter(pattern);

  /**
   * Invokes the watchers for the specified event.
   * 
   * @param {'create'|'change'|'delete'} event
   * @param {FileObject} file
   */
  const invokeWatchers = (event, file) =>
  {
    const now = Date.now();
    const { debounce } = options;

    for (const watcher of watchers[event])
    {
      if (now - watcher.invoked > debounce)
      {
        watcher.callback(file);
        watcher.invoked = now;
      }
    }
  }

  /**
   * Compares the current and previous file lists to detect changes.
   */
  const detectFileChanges = () =>
  {
    // First, we replace the previous file list with the current one.
    // Then, we read the folder and populate the current file list,
    // creating a state object for each file with its last modified date.

    trackedFiles.previous = { ...trackedFiles.current };
    const fileList = filterPaths(folder.read({ recursive: true }));

    for (const filePath of fileList)
    {
      const file = folder.file(filePath);

      /** @type {TrackedFileState} */
      const state = { file, modified: file.lastModified };

      trackedFiles.current[filePath] = state;
    }

    // Once we have the current file list, we compare it with the previous one to detect changes.
    // If a file was created, changed, or deleted, we invoke the corresponding watchers.

    const filePaths = [
      ...Object.keys(trackedFiles.current),
      ...Object.keys(trackedFiles.previous)
    ];

    for (const filePath of filePaths)
    {
      const currentFile = trackedFiles.current[filePath];
      const previousFile = trackedFiles.previous[filePath];

      const wasCreated = !previousFile;
      const wasModified = currentFile.modified !== previousFile?.modified;
      const wasDeleted = !currentFile;

      const event = wasCreated ? 'create' : (
        wasModified && !wasDeleted ? 'change' : (wasDeleted ? 'delete' : null)
      );

      if (event) invokeWatchers(event, currentFile.file);
    }
  };

  const watchProcess = setInterval(detectFileChanges, options.interval);

  return {
    /**
     * Registers a callback to be executed when a file is created, changed, or deleted.
     * 
     * @param {'create'|'change'|'delete'} event
     * @param {FileWatcherCallback} callback
     */
    on: (event, callback) =>
    {
      watchers[event].push({ callback, invoked: 0 });
    },

    /**
     * Stops the file watcher by cancelling the interval process.
     */
    cancel: () => clearInterval(watchProcess)
  };
}