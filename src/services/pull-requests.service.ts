import { formatPullRequestFilesOutput } from '../formatters/get-pull-request-files.formatters.js';
import { formatPullRequestDetailsOutput } from '../formatters/get-pull-request-details.formatter.js';
import { formatCommitsListOutput } from '../formatters/search-commits-by-pr.formatter.js';
import { formatSummarizePullRequestOutput } from '../formatters/summarize-pull-request.formatter.js';
import { buildFileCategories } from '../utils/build-file-categories.utils.js';
import { buildPullRequestInsights } from '../utils/build-pull-request-insights.util.js';
import { gitHubApi } from './github.service.js';
import { getRepositoryInfo } from './repository-info.service.js';
import { FormattedPullRequestDetails } from '../types/get-pull-request-details.types.js';
import { FormattedCommitFilesOutput } from '../types/get-pull-request-files.types.js';
import { FormattedCommitOutput } from '../types/search-commits-by-pr.types.js';

export async function getPullRequestDetails(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<FormattedPullRequestDetails> {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}`,
    );

    const isMerged = response.data.merged;

    const pullRequestDetails = formatPullRequestDetailsOutput(response.data, isMerged);

    return pullRequestDetails;
  } catch (error: any) {
    throw error;
  }
}

export async function getPullRequestFiles(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<FormattedCommitFilesOutput> {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}/files`,
    );

    const pullRequestFiles = formatPullRequestFilesOutput(response.data);

    return pullRequestFiles;
  } catch (error: any) {
    throw error;
  }
}

export async function getPullRequestCommits(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<FormattedCommitOutput> {
  try {
    const response = await gitHubApi.get(
      `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}/commits`,
    );
    const commits = formatCommitsListOutput(
      owner,
      repositoryName,
      pullRequestNumber,
      response.data,
    );

    return commits;
  } catch (error: any) {
    throw error;
  }
}

export async function summarizePullRequest(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  const repositoryInfo = await getRepositoryInfo(owner, repositoryName);

  const pullRequestDetails = await getPullRequestDetails(owner, repositoryName, pullRequestNumber);

  const pullRequestFiles = await getPullRequestFiles(owner, repositoryName, pullRequestNumber);

  const commitsByPullRequest = await getPullRequestCommits(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const changedFiles = pullRequestFiles.files.map((file) => file.fileName);

  const fileCategories = buildFileCategories(changedFiles);

  const mergeCommits = commitsByPullRequest.commits.filter((commit) => commit.isMerge).length;
  const syncCommits = commitsByPullRequest.commits.filter(
    (commit) => commit.mergeType === 'sync',
  ).length;
  const featureCommits = commitsByPullRequest.commits.filter((commit) => !commit.isMerge).length;

  const { risks, recommendations } = buildPullRequestInsights(
    commitsByPullRequest.total,
    pullRequestFiles.totalFiles,
    changedFiles,
    syncCommits,
  );

  const summary = formatSummarizePullRequestOutput(
    repositoryInfo,
    pullRequestDetails,
    pullRequestFiles,
    commitsByPullRequest,
    changedFiles,
    fileCategories,
    mergeCommits,
    syncCommits,
    featureCommits,
    { risks, recommendations },
  );

  return summary;
}
