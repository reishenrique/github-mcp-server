export function buildPullRequestReviewContextResourceTemplate(data: {
  reviewFocus: string;
  reviewSignals: string;
  pullRequestNumber: number;
  pullRequestTitle: string;
}): string {
  return `
Pull Request #${data.pullRequestNumber}
Title: ${data.pullRequestTitle}

Review Focus:
${data.reviewFocus}

Review Signals: 
${data.reviewSignals}
`;
}
