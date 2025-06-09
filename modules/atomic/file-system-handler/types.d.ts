import { makeFileObject } from './file'
import { makeFolderObject } from './folder'

declare global
{
  type FileObject = ReturnType<typeof makeFileObject>;
  type FolderObject = ReturnType<typeof makeFolderObject>;

  type IFileSystem = Pick<typeof import('node:fs'),
    'existsSync' | 'mkdirSync' | 'readFileSync' | 'readdirSync' | 'rmSync' | 'statSync' | 'writeFileSync'
  >;
}