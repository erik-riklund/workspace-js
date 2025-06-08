/**
 * ?
 * 
 * @param {string} filePath
 * @param {import('.').NodeFileSystem} fileSystem
 */
export const makeFileObject = (filePath, fileSystem) =>
{
  return {
    /**
     * ?
     */
    get path ()
    {
      return filePath;
    },

    /**
     * ?
     */
    get name ()
    {
      return filePath.split('/').pop() || '';
    },

    /**
     * ?
     */
    get folder ()
    {
      return filePath.includes('/') ? filePath.slice(0, filePath.lastIndexOf('/')) : '.';
    },

    /**
     * ?
     */
    get exists ()
    {
      if (!fileSystem.existsSync(filePath))
      {
        return false; // file does not exist.
      }

      return fileSystem.statSync(filePath).isFile();
    },

    /**
     * ?
     */
    get lastModified ()
    {
      if (!fileSystem.existsSync(filePath))
      {
        return -1; // file does not exist.
      }

      const stats = fileSystem.statSync(filePath);
      return stats.isFile() ? stats.mtimeMs : -1;
    },

    /**
     * ?
     */
    delete ()
    {
      fileSystem.rmSync(filePath);
    },

    /**
     * ?
     */
    read (encoding = 'utf8')
    {
      if (!this.exists)
      {
        throw new Error(`File "${filePath}" does not exist.`);
      }

      // @ts-expect-error: encoding as a string is valid.
      return fileSystem.readFileSync(filePath, encoding);
    },

    /**
     * ?
     */
    readJson (encoding = 'utf8')
    {
      return JSON.parse(this.read(encoding));
    },

    /**
     * ?
     */
    write (data, encoding = 'utf8')
    {
      // @ts-expect-error: encoding as a string is valid.
      fileSystem.writeFileSync(filePath, data, encoding);
    },

    /**
     * ?
     */
    writeJson (data, encoding = 'utf8')
    {
      this.write(JSON.stringify(data, null, 2), encoding);
    }
  };
}