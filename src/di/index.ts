import infrastructures from "./infrastructures";
import presenters from "./presenters";
import repositories from "./repositories";
import useCases from "./useCases";

const createdInfrastructures = infrastructures();
const createdRepositories = repositories(createdInfrastructures);
const createdUseCases = useCases(createdRepositories);
const createdPresenters = presenters(createdUseCases);

export default {
  post: createdPresenters.postPresenter,
};
