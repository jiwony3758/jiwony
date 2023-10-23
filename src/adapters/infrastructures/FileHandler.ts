import path from "path";
import { ObjectEncodingOptions, existsSync } from "fs";
import fs from "fs/promises";
import matter from "gray-matter";

export interface IFileInfo {
  extension: string;
  rootPath: string;
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
  findFiles(directory: string, fileNameExtension: string): Promise<string[]>;

  /**
   * 파일 존재 여부 확인
   * @param paramPath 파일 경로
   *
   * @return true | false
   */
  exists(paramPath: string): boolean;

  /**
   * string 형태로 읽은 파일을 gray-matter 라이브러리로 front matter 형태로 변환.
   * @param data string 형태의 읽은 파일 결과
   *
   * @return {
   *  data: { [key: string]: any }
   *  content: string
   *  excerpt?: string
   *  orig: Buffer | I
   *  language: string
   *  matter: string
   *  stringify(lang: string): string
   * }
   */
  convertFrontMatterToObject(data: string): matter.GrayMatterFile<string>;

  /**
   * 파일 정보 가져오기
   * @param rootPath
   * @return {IFileInfo}
   */
  getFileInfo(rootPath: string): IFileInfo;

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
    const resultFiles: string[] = [];

    const searchFile = async (directory: string): Promise<void> => {
      const files = await this.readDir(directory);

      for await (const file of files) {
        const filePath = path.join(directory, file);
        const fileStat = await fs.stat(filePath);

        if (fileStat.isDirectory()) {
          await searchFile(filePath);
        } else if (file.endsWith(fileNameExtension)) {
          resultFiles.push(filePath);
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

  getFileInfo(rootPath: string): IFileInfo {
    const fileInfo: IFileInfo = {
      extension: "",
      rootPath: "",
    };
    const pathArray = rootPath.split("/");
    fileInfo.extension = pathArray[pathArray.length - 1].split(".")[1];
    fileInfo.rootPath = rootPath;
    return fileInfo;
  }
}
