import { gitHubApi } from '../config/github.config.js';
import { issueDetailsOutput } from '../formatters/create-issue.formatter.js';
import { formatGetRepositoryInfoOutput } from '../formatters/get-repository-info.formatter.js';
import { gitHubIntegration } from '../integrations/github.integration.js';
import { IssueDataOutput } from '../types/create-issue.types.js';
import { FormattedRepositoryInfoOutput } from '../types/get-repository-info.types.js';

export async function getRepositoryInfo(
  owner: string,
  repositoryName: string,
): Promise<FormattedRepositoryInfoOutput> {
  const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}`);

  const repositoryInfo = formatGetRepositoryInfoOutput(response.data);

  return repositoryInfo;
}

export async function createIssue(
  owner: string,
  repositoryName: string,
  issueTitle: string,
  body?: string,
): Promise<IssueDataOutput> {
  const response = await gitHubIntegration.issues.createIssue(
    owner,
    repositoryName,
    issueTitle,
    body,
  );

  const issueDetails = issueDetailsOutput(response.data);

  return issueDetails;
}

export async function listRepositories(username: string) {
  const response = await gitHubIntegration.repositories.listRepositories(username);

  const repos = response.map((repo: any) => `- ${repo.name}`).join('\n');

  return repos;
}
