import infrastructures from "./infrastructures";
import repositories from "./repositories";
import useCases from "./useCases";


const createdInfrastructures = infrastructures();
const createdRepositories = repositories(createdInfrastructures);
const createdUseCases = useCases(createdRepositories);

export default {
  post: createdUseCases.postUseCase,
}