import { formatGetRepositoryInfoOutput } from '../formatters/get-repository-info.formatter.js';
import { FormattedRepositoryInfoOutput } from '../utils/types.js';
import { gitHubApi } from './github.service.js';

export async function getRepositoryInfo(
  owner: string,
  repositoryName: string,
): Promise<FormattedRepositoryInfoOutput> {
  const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}`);

  const repositoryInfo = formatGetRepositoryInfoOutput(response.data);

  return repositoryInfo;
}
