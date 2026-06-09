export function buildPullRequestNarrativeSummary(title: string, impactSummary: string[]): string {
  if (impactSummary.length === 0) {
    return `Pull request "${title}" introduces repository changes`;
  }

  return `Pull request "${title}" includes the following changes: ${impactSummary.join(', ')}.`;
}
