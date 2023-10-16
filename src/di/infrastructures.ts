import { FileHandler } from "@/adapters/infrastructures/FileHandler";

export interface IInfrastructures {
  fileHandler: FileHandler;
}

export default (): IInfrastructures => ({
  fileHandler: new FileHandler(),
});
