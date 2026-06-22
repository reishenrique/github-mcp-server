import { gitHubApi } from '../config/github.config.js';
import { handleGitHubError } from '../utils/handlers/github-error-handler.util.js';

async function getPullRequestDetails(
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

async function getPullRequestFiles(
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

async function getPullRequestCommits(
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

async function createCommentOnPullRequest(
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

async function listPullRequests(owner: string, repositoryName: string) {
  try {
    const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}/pulls`);

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

async function listRepositories(username: string) {
  try {
    const response = await gitHubApi.get(`/users/${username}/repos`);

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

async function createIssue(
  owner: string,
  repositoryName: string,
  issueTitle: string,
  body?: string,
) {
  try {
    const response = await gitHubApi.post(`/repos/${owner}/${repositoryName}/issues`, {
      title: issueTitle,
      body,
    });

    return response.data;
  } catch (error: unknown) {
    handleGitHubError(error);
  }
}

export const gitHubIntegration = {
  pullRequests: {
    getPullRequestDetails,
    getPullRequestFiles,
    getPullRequestCommits,
    createCommentOnPullRequest,
    listPullRequests,
  },
  issues: {
    createIssue,
  },
  repositories: {
    listRepositories,
  },
};
