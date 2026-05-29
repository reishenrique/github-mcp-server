export function buildSummaryPullRequestCacheKey(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): string {
  return `${owner}-${repositoryName}-${pullRequestNumber}`;
}
