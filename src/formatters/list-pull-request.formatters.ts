import {
  FormattedPullRequestListOutput,
  PullRequestInfo,
} from '../types/list-pull-request.types.js';

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
