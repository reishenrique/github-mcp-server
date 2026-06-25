import {
  PullRequestDetailsData,
  PullRequestDetailsOutput,
} from '../types/get-pull-request-details.types.js';

export function pullRequestDetailsOutput(
  pullRequestData: PullRequestDetailsData,
  isMerged: boolean,
): PullRequestDetailsOutput {
  const pullRequestDetails = {
    from: pullRequestData.user.login,
    number: pullRequestData.number,
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
    state: pullRequestData.state,
  };

  return pullRequestDetails;
}
