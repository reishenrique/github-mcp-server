export function buildPullRequestReviewChecklistResourceTemplate(data: {
  reviewChecklistBulletList: string;
  pullRequestNumber: number;
  pullRequestTitle: string;
  generatedAt: string;
}): string {
  return `
Pull Request #${data.pullRequestNumber}
Title: ${data.pullRequestTitle}

Review Checlist:
${data.reviewChecklistBulletList}

Generated at: ${data.generatedAt}
  `;
}
