import fs from 'node:fs'
import { makeFileSystemHandler } from 'module/file-handler'

const fileSystem = makeFileSystemHandler(fs);

