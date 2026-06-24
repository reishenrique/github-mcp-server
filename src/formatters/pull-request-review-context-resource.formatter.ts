import { PullRequestReviewContextOutput } from '../types/pull-request-review-context.type.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';
import { buildPullRequestReviewContextResourceTemplate } from '../utils/templates/resources/pull-request-review-context.resource-template.js';

export function formatPullRequestReviewContextResource({
  reviewFocus,
  reviewSignals,
  pullRequestNumber,
  pullRequestTitle,
}: PullRequestReviewContextOutput): string {
  const reviewFocusBulletList = buildBulletList(reviewFocus, 'No significant focus detected');
  const reviewSignalsBulletList = buildBulletList(reviewSignals, 'No significant signals detected');

  return buildPullRequestReviewContextResourceTemplate({
    reviewFocus: reviewFocusBulletList,
    reviewSignals: reviewSignalsBulletList,
    pullRequestNumber,
    pullRequestTitle,
  });
}
