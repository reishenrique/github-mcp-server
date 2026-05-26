import { detectMergeType } from './detectMergeType.util.js';
import { FormattedCommitOutput, GitHubPRCommit, PullRequestInfo } from './types.js';

export function formatPullRequestOutput(pullRequests: PullRequestInfo[]): string {
  const formattedOutput = pullRequests
    .map((pr) => `- ${pr.title} (from: ${pr.user.login})`)
    .join('\n');

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
