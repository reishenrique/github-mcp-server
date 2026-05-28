import { FileCategories } from '../utils/build-file-categories.utils.js';
import {
  FormattedCommitFilesOutput,
  FormattedCommitOutput,
  FormattedPullRequestDetails,
  FormattedRepositoryInfoOutput,
} from '../utils/types.js';

type FormatSummarizePullRequestOutput = {
  repository: {
    owner: string;
    repositoryName: string;
  };
  pullRequest: {
    number: number;
    title: string;
    state: string;
    author: string;
    createdAt: string;
    merged: boolean;
  };
  metrics: {
    totalFiles: number;
    totalCommits: number;
    additions: number;
    deletions: number;
    changes: number;
  };
  changedFiles: string[];
  fileCategories: {
    sourceFiles?: number;
    testsFiles?: number;
    documentationFiles?: number;
    ciFiles?: number;
    configutarionFiles?: number;
    contextFiles?: number;
  };
  commitsInsights: {
    mergeCommits: number;
    syncCommits: number;
    featureCommits: number;
  };
  summary: string;
  risks: string[];
  recommendations: string[];
};

export function formatSummarizePullRequestOutput(
  repositoryInfo: FormattedRepositoryInfoOutput,
  pullRequestDetails: FormattedPullRequestDetails,
  pullRequestFiles: FormattedCommitFilesOutput,
  commitsByPullRequest: FormattedCommitOutput,
  changedFiles: string[],
  fileCategories: FileCategories,
  mergeCommits: number,
  syncCommits: number,
  featureCommits: number,
  { risks, recommendations }: { risks: string[]; recommendations: string[] },
): FormatSummarizePullRequestOutput {
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
