export function buildPullRequestRequestReviewStrategyResourceTemplate(data: {
  reviewStrategyBulletList: string;
  pullRequestNumber: number;
  pullRequestTitle: string;
  generatedAt: string;
}): string {
  return `
Pull Request #${data.pullRequestNumber}
Title: ${data.pullRequestTitle}

Recommended Review Strategy: 
${data.reviewStrategyBulletList}

Generated at: ${data.generatedAt}
  `;
}
