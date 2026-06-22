import { gitHubApi } from '../services/github.service.js';

export async function getPullRequestDetailsFromGithub(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  const response = await gitHubApi.get(
    `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}`,
  );

  return response.data;
}
