import { PullRequestListDataOutput, PullRequestData } from '../types/list-pull-request.types.js';

export function pullRequestListOutput(pullRequests: PullRequestData[]): PullRequestListDataOutput {
  const formattedOutput = pullRequests.map((pr) => {
    return {
      title: pr.title,
      from: pr.user.login,
    };
  });

  return formattedOutput;
}
