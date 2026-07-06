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
  return `reviewChecklist:${owner}-${repositoryName}-${pullRequestNumber}`;
}

export function buildPullRequestReviewStrategyCacheKey(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): string {
  return `reviewStrategy:${owner}-${repositoryName}-${pullRequestNumber}`;
}
