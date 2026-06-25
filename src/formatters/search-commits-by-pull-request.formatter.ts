import {
  PullRequestCommitData,
  PullRequestCommitOutput,
} from '../types/search-commits-by-pull-request.types.js';
import { detectMergeType } from '../utils/detect-merge-type.util.js';

export function formatCommitsListOutput(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
  commits: PullRequestCommitData[],
): PullRequestCommitOutput {
  return {
    repository: {
      owner,
      name: repositoryName,
    },
    pullRequestNumber,
    total: commits.length,
    commits: commits.map((commit: PullRequestCommitData) => {
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
