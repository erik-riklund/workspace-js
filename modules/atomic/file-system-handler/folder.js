import { makeFileObject } from './file'

/**
 * ?
 * 
 * @param {string} folderPath
 * @param {import('.').NodeFileSystem} fileSystem
 */
export const makeFolderObject = (folderPath, fileSystem) =>
{
  return {
    /**
     * ?
     */
    get path ()
    {
      return folderPath;
    },

    /**
     * ?
     */
    get exists ()
    {
      return fileSystem.existsSync(folderPath);
    },

    /**
     * ?
     */
    create ()
    {
      if (!this.exists)
      {
        fileSystem.mkdirSync(folderPath, { recursive: true });
      }
    },

    /**
     * ?
     */
    delete ()
    {
      if (this.exists)
      {
        fileSystem.rmSync(folderPath, { recursive: true, force: true });
      }
    },

    /**
     * ?
     */
    clear ()
    {
      if (this.exists)
      {
        fileSystem.rmSync(folderPath, { recursive: true, force: true });

        this.create();
      }
    },

    /**
     * ?
     * 
     * @returns {string[]}
     */
    read (options = { recursive: false })
    {
      if (!this.exists)
      {
        throw new Error(`Folder "${folderPath}" does not exist.`);
      }

      const fileList = [];
      const items = fileSystem.readdirSync(
        folderPath, { withFileTypes: true, ...options }
      );

      const rootFolderPath = folderPath.replace(/^\.*\//, '');

      for (const item of items)
      {
        if (item.isFile())
        {
          const normalizedPath = item.parentPath.replace(/\\/g, '/');

          if (!normalizedPath || normalizedPath === '/')
          {
            fileList.push(item.name);

            continue; // no parent folder.
          }

          const relativePath = normalizedPath.slice(rootFolderPath.length + 1);

          if (!relativePath)
          {
            fileList.push(item.name); // no parent folder.
          }
          else
          {
            fileList.push(`${relativePath}/${item.name}`);
          }
        }
      }

      return fileList;
    },

    /**
     * ?
     * 
     * @param {string} fileName
     */
    file (fileName)
    {
      return makeFileObject(`${folderPath}/${fileName}`, fileSystem);
    }
  };
}