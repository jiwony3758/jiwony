import { IPostRepository } from "@/domain/useCases/repository-interfaces/Post";
import { IFileHandler } from "../infrastructures/FileHandler";
import { IPostProperties } from "@/domain/entities/Post";
import { NotionClient } from "../infrastructures/NotionClient";
import {
  NotionProperty,
  NotionRichText,
} from "../infrastructures/types/Notion.type";
import {
  ICreatePostDTO,
  IPostContentByContentIdRequestDTO,
  IPostContentByPageIdRequestDTO,
  IPostDTO,
} from "@/domain/dtos/Post";

export class PostRepository implements IPostRepository {
  constructor(
    private readonly notionDatabaseId: string,
    private readonly directory: string,
    private readonly fileHandler: IFileHandler,
    private readonly notionClient: NotionClient
  ) {}

  async getPostsProperties(): Promise<IPostProperties[]> {
    const dbResults = await this.notionClient.databasesQuery({
      databaseId: this.notionDatabaseId,
    });
    const postProperties = dbResults.map((dbResult) => ({
      ...dbResult.properties,
    }));
    return postProperties.map((properties) => {
      const postProperty = {} as IPostProperties;
      Object.keys(properties).map((property) => {
        const value = this.notionClient.propertyToJsType(
          properties[property] as NotionProperty
        );
        Object.assign(postProperty, { [property]: value });
      });
      return postProperty;
    });
  }

  async getPostPropertiesByContentId(
    contentId: string
  ): Promise<IPostProperties> {
    const properties = {} as IPostProperties;
    const results = await this.notionClient.databasesQuery({
      databaseId: this.notionDatabaseId,
    });

    const [filteredPage] = results.filter(({ properties }) => {
      return (
        (properties["contentId"] as NotionRichText).rich_text[0].text
          .content === contentId
      );
    });

    const { properties: pageProperties } = filteredPage;

    Object.keys(pageProperties).map((property) => {
      const value = this.notionClient.propertyToJsType(
        pageProperties[property] as NotionProperty
      );
      Object.assign(properties, { [property]: value });
    });

    return properties;
  }

  async getPostContentByPageId(
    params: IPostContentByPageIdRequestDTO
  ): Promise<string> {
    const { pageId, form } = params;
    let content = "";
    const blockContentList = await this.notionClient.blockList({
      blockId: pageId,
    });
    blockContentList.map(
      (blockContentList) => (content = content + blockContentList)
    );
    if (form === "md") {
      content = await this.fileHandler.convertMdToHtml(content);
    }
    return content;
  }

  async getPostContentByContentId(
    params: IPostContentByContentIdRequestDTO
  ): Promise<string> {
    const { contentId, form } = params;
    let content = "";
    const results = await this.notionClient.databasesQuery({
      databaseId: this.notionDatabaseId,
    });

    const [filteredPage] = results.filter(({ properties }) => {
      return (
        (properties["contentId"] as NotionRichText).rich_text[0].text
          .content === contentId
      );
    });
    const blockContentList = await this.notionClient.blockList({
      blockId: filteredPage.id,
    });
    blockContentList.map((blockContent) => (content = content + blockContent));

    if (form === "md") {
      content = await this.fileHandler.convertMdToHtml(content);
    }

    return content;
  }

  async getPostsInfo(): Promise<IPostDTO[]> {
    const dbResults = await this.notionClient.databasesQuery({
      databaseId: this.notionDatabaseId,
    });
    const postProperties = dbResults.map((dbResult) => ({
      ...dbResult.properties,
    }));
    const result: IPostDTO[] = postProperties.map((properties, index) => {
      const postDTO = {} as IPostDTO;
      Object.assign(postDTO, { pageId: dbResults[index].id });
      Object.keys(properties).map((property) => {
        const value = this.notionClient.propertyToJsType(
          properties[property] as NotionProperty
        );
        Object.assign(postDTO, { [property]: value });
      });
      return postDTO;
    });

    return result;
  }

  async getPostInfoByContentId(contentId: string): Promise<IPostDTO> {
    const postDTO = {} as IPostDTO;

    const results = await this.notionClient.databasesQuery({
      databaseId: this.notionDatabaseId,
    });

    const [filteredPage] = results.filter(({ properties }) => {
      return (
        (properties["contentId"] as NotionRichText).rich_text[0].text
          .content === contentId
      );
    });
    const { properties, id } = filteredPage;
    Object.assign(postDTO, { pageId: id });
    Object.keys(properties).map((property) => {
      const value = this.notionClient.propertyToJsType(
        properties[property] as NotionProperty
      );
      Object.assign(postDTO, { [property]: value });
    });
    return postDTO;
  }

  async writePost(params: ICreatePostDTO): Promise<void> {
    const BLOCK_LIMIT = 2000;
    const {
      contentId,
      title,
      category,
      description,
      date,
      tags,
      form,
      content,
    } = params;

    const contentBlocks: string[] = [];

    for (let i = 0; i < content.length; i = i + BLOCK_LIMIT) {
      contentBlocks.push(content.substring(i, i + BLOCK_LIMIT));
    }

    await this.notionClient.pages.create({
      parent: {
        type: "database_id",
        database_id: this.notionDatabaseId,
      },
      properties: {
        contentId: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: contentId,
              },
            },
          ],
        },
        title: {
          type: "title",
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        description: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
        date: {
          type: "date",
          date: {
            start: date,
          },
        },
        category: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: category,
              },
            },
          ],
        },
        tags: {
          type: "multi_select",
          multi_select: tags.map((tag) => ({
            name: tag,
          })),
        },
        form: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: form,
              },
            },
          ],
        },
      },
      children: contentBlocks.map((contentBlock) => ({
        paragraph: {
          rich_text: [
            {
              text: {
                content: contentBlock,
              },
            },
          ],
        },
      })),
    });
  }
}
