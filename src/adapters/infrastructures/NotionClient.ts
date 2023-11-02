import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  BlockObjectResponse,
  DateResponse,
  NotionProperty,
  RichTextItemResponse,
  SelectPropertyResponse,
  UniqueIdResponse,
} from "./types/Notion.type";

export interface INotionClient extends Client{
  /**
   * @param blockId blockId 또는 pageId
   * @link [blockId 참고](https://developers.notion.com/reference/retrieve-a-block)
   * @return pageId로 호출할 경우 pageId의 block 리스트가 반환됨.
   */
  blockList({ blockId }: { blockId: string }): Promise<string[]>;

  /**
   * 
   * @param databaseId notion databaseId
   * @link [databaseId 보는 방법](https://developers.notion.com/reference/retrieve-a-database)
   * @return jiwony에서는 현재 page로만 구성되어있어 PageObjectResponse의 배열로 받는다. 배열인 이유는 1 row마다 page가 생성되기 때문.
   */
  databasesQuery({ databaseId }: { databaseId: string }): Promise<PageObjectResponse[]>;

  /**
   * 
   * @param property 현재 사용중인 property 종류 - title, date, multi_select, rich_text, unique_id, status
   * @return Javascript의 고유 타입으로 반환함
   * @example title -> string, date -> string, multi_select -> string[]
   */
  propertyToJsType(property: NotionProperty): string | string[] | number;
}

export class NotionClient extends Client implements INotionClient{
  async blockList({ blockId }: { blockId: string }): Promise<string[]> {
    const { results } = await this.blocks.children.list({ block_id: blockId });
    return (results as BlockObjectResponse[]).map(
      (result) => result.paragraph.rich_text[0].text.content
    );
  }

  async databasesQuery({
    databaseId,
  }: {
    databaseId: string;
  }): Promise<PageObjectResponse[]> {
    const { results } = await this.databases.query({ database_id: databaseId });

    return results as PageObjectResponse[];
  }

  propertyToJsType(property: NotionProperty): string | string[] | number {
    const { type } = property;
    switch (type) {
      case "date":
        return (property[type] as DateResponse).start;
      case "multi_select":
        return (property[type] as SelectPropertyResponse[]).map(
          (item) => item.name
        );
      case "unique_id":
        return (property[type] as UniqueIdResponse).number as number;
      case "status":
        return (property[type] as SelectPropertyResponse).name;
      default:
        return (property[type] as RichTextItemResponse[])[0].text.content;
    }
  }
}
