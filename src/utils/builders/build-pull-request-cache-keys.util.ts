export function buildSummaryPullRequestCacheKey(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): string {
  return `${owner}-${repositoryName}-${pullRequestNumber}`;
}

export function buildPullRequestReviewContextCacheKey(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): string {
  return `reviewContext:${owner}-${repositoryName}-${pullRequestNumber}`;
}

export function buildPullRequestReviewChecklistCacheKey(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): string {
  return `reviewChecklsit:${owner}-${repositoryName}-${pullRequestNumber}`;
}
