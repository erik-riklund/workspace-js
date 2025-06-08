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
 * ?
 * 
 * @param {NodeFileSystem} fileSystem
 */
export const makeFileSystemHandler = (fileSystem) =>
{
  return {
    /**
     * ?
     * 
     * @param {string} path
     */
    file: (path) => makeFileObject(path, fileSystem),

    /**
     * ?
     * 
     * @param {string} path
     */
    folder: (path) => makeFolderObject(path, fileSystem)
  }
}