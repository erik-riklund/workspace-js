/**
 * @typedef {Object} NodeFileSystem
 * 
 * @property {import('node:fs').existsSync} existsSync
 * @property {import('node:fs').mkdirSync} mkdirSync
 * @property {import('node:fs').readdirSync} readdirSync
 * @property {import('node:fs').readFileSync} readFileSync
 * @property {import('node:fs').rmSync} rmSync
 * @property {import('node:fs').statSync} statSync
 * @property {import('node:fs').writeFileSync} writeFileSync
 */

import { makeFileObject } from './file'
import { makeFolderObject } from './folder'

/**
 * Creates a file system handler object that uses the provided
 * file system object to interact with files and folders.
 * 
 * @param {NodeFileSystem} fileSystem
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