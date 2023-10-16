import path from "path";
import { ObjectEncodingOptions, existsSync } from "fs";
import fs from "fs/promises";
import matter from "gray-matter";

export interface IFilePath {
  /**
   * 절대경로
   */
  rootPath: string;
  /**
   * 상대경로
   */
  relativePath: string;
}

export interface IFileInfo {
  fileExtension: string;
  filePath: IFilePath;
}

export interface IFileHandler {
  readFile(
    paramPath: string,
    options?: {
      encoding?: BufferEncoding | undefined;
      flag?: string | undefined;
    } | null
  ): Promise<string | Buffer>;

  readDir(
    paramPath: string,
    options?:
      | (ObjectEncodingOptions & {
          withFileTypes?: false | undefined;
          recursive?: boolean | undefined;
        })
      | BufferEncoding
      | null
  ): Promise<string[]>;

  /**
   * refDirectory 하위로 있는 fileNameExtension의 확장명 파일을 전부 검색.
   * @param refDirectory 검색할 디렉터리
   * @param fileNameExtension 검색할 파일 확장명
   *
   * @return refDirectory 하위의 있는 파일들을 절대 경로, 상대 경로 모두 반환.
   */
  findFiles(directory: string, fileNameExtension: string): Promise<IFilePath[]>;
  exists(paramPath: string): boolean;
  convertFrontMatterToObject(data: string): matter.GrayMatterFile<string>;
}

export class FileHandler implements IFileHandler {
  async readFile(
    paramPath: string,
    options?: {
      encoding?: BufferEncoding | undefined;
      flag?: string | undefined;
    } | null
  ): Promise<string | Buffer> {
    return await fs.readFile(paramPath, options);
  }

  async readDir(
    paramPath: string,
    options?:
      | (ObjectEncodingOptions & {
          withFileTypes?: false | undefined;
          recursive?: boolean | undefined;
        })
      | BufferEncoding
      | null
  ): Promise<string[]> {
    return await fs.readdir(paramPath, options);
  }

  async findFiles(refDirectory: string, fileNameExtension: string) {
    const resultFiles: IFilePath[] = [];

    const searchFile = async (directory: string): Promise<void> => {
      const files = await this.readDir(directory);

      for await (const file of files) {
        const filePath = path.join(directory, file);
        const fileStat = await fs.stat(filePath);

        if (fileStat.isDirectory()) {
          await searchFile(filePath);
        } else if (file.endsWith(fileNameExtension)) {
          const relativePath = path.relative(refDirectory, filePath);
          resultFiles.push({
            rootPath: filePath,
            relativePath,
          });
        }
      }
    };

    await searchFile(refDirectory);
    return resultFiles;
  }

  exists(paramPath: string): boolean {
    return existsSync(paramPath);
  }
  convertFrontMatterToObject(data: string): matter.GrayMatterFile<string> {
    const matterResult = matter(data);
    return {
      ...matterResult,
    };
  }
}
