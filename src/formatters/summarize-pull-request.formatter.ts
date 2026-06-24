import { FormattedPullRequestDetails } from '../types/get-pull-request-details.types.js';
import { FormattedCommitFilesOutput } from '../types/get-pull-request-files.types.js';
import { FormattedRepositoryInfoOutput } from '../types/get-repository-info.types.js';
import { FormattedCommitOutput } from '../types/search-commits-by-pr.types.js';
import { SummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';
import { FileCategories } from '../utils/builders/build-file-categories.utils.js';

export function formatSummarizePullRequestOutput(
  repositoryInfo: FormattedRepositoryInfoOutput,
  pullRequestDetails: FormattedPullRequestDetails,
  pullRequestFiles: FormattedCommitFilesOutput,
  commitsByPullRequest: FormattedCommitOutput,
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
