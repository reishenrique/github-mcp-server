import { PullRequestContextReviewValue } from '../cache/pull-request.cache.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';
import { buildPullRequestReviewContextResourceTemplate } from '../utils/templates/resources/pull-request-review-context.resource-template.js';

export function pullRequestReviewContextResource({
  reviewContext,
  generatedAt,
}: PullRequestContextReviewValue): string {
  const reviewFocusBulletList = buildBulletList(
    reviewContext.reviewFocus,
    'No significant focus detected',
  );
  const reviewSignalsBulletList = buildBulletList(
    reviewContext.reviewSignals,
    'No significant signals detected',
  );

  return buildPullRequestReviewContextResourceTemplate({
    reviewFocus: reviewFocusBulletList,
    reviewSignals: reviewSignalsBulletList,
    pullRequestNumber: reviewContext.pullRequestNumber,
    pullRequestTitle: reviewContext.pullRequestTitle,
    generatedAt,
  });
}
