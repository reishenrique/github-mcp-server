import { PullRequestDetailsOutput } from '../types/get-pull-request-details.types.js';
import { CommitFilesOutput } from '../types/get-pull-request-files.types.js';
import { RepositoryInfoOutput } from '../types/get-repository-info.types.js';
import { PullRequestCommitOutput } from '../types/search-commits-by-pull-request.types.js';
import { SummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';
import { FileCategories } from '../utils/builders/build-file-categories.utils.js';

export function summarizePullRequestOutput(
  repositoryInfo: RepositoryInfoOutput,
  pullRequestDetails: PullRequestDetailsOutput,
  pullRequestFiles: CommitFilesOutput,
  commitsByPullRequest: PullRequestCommitOutput,
  changedFiles: string[],
  fileCategories: FileCategories,
  impactSummary: string[],
  mergeCommits: number,
  syncCommits: number,
  featureCommits: number,
  { risks, recommendations }: { risks: string[]; recommendations: string[] },
): SummarizePullRequestOutput {
  const summary = {
    repository: {
      owner: repositoryInfo.owner,
      repositoryName: repositoryInfo.repositoryName,
    },
    pullRequest: {
      number: pullRequestDetails.number,
      title: pullRequestDetails.title,
      state: pullRequestDetails.state,
      author: pullRequestDetails.from,
      createdAt: pullRequestDetails.createdAt,
      merged: pullRequestDetails.isMerged,
    },
    metrics: {
      totalFiles: pullRequestFiles.totalFiles,
      totalCommits: commitsByPullRequest.total,
      additions: pullRequestDetails.additions,
      deletions: pullRequestDetails.deletions,
      changes: pullRequestDetails.changedFiles,
    },
    changedFiles,
    fileCategories,
    impactSummary,
    commitsInsights: {
      mergeCommits,
      syncCommits,
      featureCommits,
    },
    summary: `This pull request modifies ${pullRequestFiles.totalFiles} files and includes ${commitsByPullRequest.total} commits related to "${pullRequestDetails.title}"`,
    risks,
    recommendations,
  };

  return summary;
}
