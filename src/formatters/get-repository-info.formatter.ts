import {
  RepositoryData,
  FormattedRepositoryInfoOutput,
} from '../types/get-repository-info.types.js';

export function formatGetRepositoryInfoOutput(
  repositoryData: RepositoryData,
): FormattedRepositoryInfoOutput {
  const repositoryInfo = {
    repositoryName: repositoryData.name,
    isPrivate: repositoryData.private,
    owner: repositoryData.owner.login,
    url: repositoryData.html_url,
    language: repositoryData.language,
    defaultBranch: repositoryData.default_branch,
  };

  return repositoryInfo;
}
