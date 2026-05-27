import { detectMergeType } from './detectMergeType.util.js';
import {
  FormattedCommitOutput,
  GitHubPRCommit,
  FormattedPullRequestListOutput,
  PullRequestInfo,
  CommitFiles,
  FormattedCommitFilesOutput,
  FormattedPullRequestDetails,
  PullRequestDataInfo,
} from './types.js';

export function formatPullRequestListOutput(
  pullRequests: PullRequestInfo[],
): FormattedPullRequestListOutput {
  const formattedOutput = pullRequests.map((pr) => {
    return {
      title: pr.title,
      from: pr.user.login,
    };
  });

  return formattedOutput;
}

export function formatCommitsListOutput(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
  commits: GitHubPRCommit[],
): FormattedCommitOutput {
  return {
    repository: {
      owner,
      name: repositoryName,
    },
    pullRequestNumber,
    total: commits.length,
    commits: commits.map((commit: GitHubPRCommit) => {
      const message = commit.commit.message;

      const isMerge = message.startsWith('Merge');

      return {
        sha: commit.sha,
        shortSha: commit.sha.slice(0, 7),
        message: commit.commit.message,
        title: commit.commit.message.split('\n')[0],
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          date: commit.commit.author.date,
        },
        url: commit.html_url,
        isMerge,
        mergeType: isMerge ? detectMergeType(message) : 'none',
      };
    }),
  };
}

export function formatPullRequestFilesOutput(
  commitFiles: CommitFiles[],
): FormattedCommitFilesOutput {
  return {
    totalFiles: commitFiles.length,
    filesNames: commitFiles.map((files: CommitFiles) => {
      return {
        sha: files.sha,
        fileName: files.filename,
        status: files.status,
        additions: files.additions,
        deletions: files.deletions,
        changes: files.changes,
      };
    }),
  };
}

export function formatPullRequestDetailsOutput(
  pullRequestData: PullRequestDataInfo,
  isMerged: boolean,
): FormattedPullRequestDetails {
  const pullRequestDetails = {
    from: pullRequestData.user.login,
    url: pullRequestData.url,
    title: pullRequestData.title,
    description: pullRequestData.body,
    createdAt: pullRequestData.created_at,
    isMerged,
    mergedBy: isMerged ? (pullRequestData.merged_by?.login ?? null) : null,
    commits: pullRequestData.commits,
    additions: pullRequestData.additions,
    deletions: pullRequestData.deletions,
    changedFiles: pullRequestData.changed_files,
  };

  return pullRequestDetails;
}
