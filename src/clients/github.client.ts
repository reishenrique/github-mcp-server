import { gitHubApi } from '../services/github.service.js';
import { handleGitHubError } from '../utils/handlers/github-error-handler.util.js';

export async function getPullRequestDetailsFromGithub(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}`,
    );

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

export async function getPullRequestFilesFromGithub(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}/files`,
    );

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

export async function getPullRequestCommitsFromGithub(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}/commits`,
    );

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

export async function createCommentOnPullRequestFromGithub(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
  body: string,
) {
  try {
    const response = await gitHubApi.post(
      `/repos/${owner}/${repositoryName}/issues/${pullRequestNumber}/comments`,
      {
        body,
      },
    );

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}
