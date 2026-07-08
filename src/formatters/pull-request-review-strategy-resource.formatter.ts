import { PullRequestReviewStrategyValue } from '../cache/pull-request.cache.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';
import { buildPullRequestRequestReviewStrategyResourceTemplate } from '../utils/templates/resources/pull-request-review-strategy.resource-template.js';

export function pullRequestReviewStrategyResource(value: PullRequestReviewStrategyValue): string {
  const reviewStrategy = value.output.reviewStrategy;
  const reviewStrategyBulletList = buildBulletList(reviewStrategy, 'No review strategy detected');

  const pullRequestNumber = value.output.pullRequestNumber;
  const pullRequestTitle = value.output.pullRequestTitle;
  const generatedAt = value.generatedAt;

  return buildPullRequestRequestReviewStrategyResourceTemplate({
    reviewStrategyBulletList,
    pullRequestNumber,
    pullRequestTitle,
    generatedAt,
  });
}
