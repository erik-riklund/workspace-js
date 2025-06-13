import { makeFileObject } from './file'
import { makeFolderObject } from './folder'

/**
 * Creates a file system handler object that uses the provided
 * file system object to interact with files and folders.
 * 
 * @param {FileHandler.FileSystem} fileSystem
 */
export const makeFileSystemHandler = (fileSystem) =>
{
  return {
    /**
     * Creates a new file object for the specified path.
     * 
     * @param {string} path
     */
    file: (path) => makeFileObject(path, fileSystem),

    /**
     * Creates a new folder object for the specified path.
     * 
     * @param {string} path
     */
    folder: (path) => makeFolderObject(path, fileSystem)
  }
}