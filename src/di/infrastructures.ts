import { FileHandler } from "@/adapters/infrastructures/FileHandler";
import { NotionClient } from "@/adapters/infrastructures/NotionClient";

export interface IInfrastructures {
  fileHandler: FileHandler;
  notionClient: NotionClient;
}

export default (): IInfrastructures => ({
  fileHandler: new FileHandler(),
  notionClient: new NotionClient({ auth: process.env.NOTION_SECRET }),
});
