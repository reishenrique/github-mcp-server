import { PullRequestReviewChecklistValue } from '../cache/pull-request.cache.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';
import { buildPullRequestReviewChecklistResourceTemplate } from '../utils/templates/resources/pull-request-review-checklist.resource-template.js';

export function pullRequestReviewChecklistResource(value: PullRequestReviewChecklistValue): string {
  const reviewChecklist = value.output.reviewChecklist;
  const reviewChecklistBulletList = buildBulletList(reviewChecklist, 'No checklist detected');

  const pullRequestNumber = value.output.pullRequestNumber;
  const pullRequestTitle = value.output.pullRequestTitle;
  const generatedAt = value.generatedAt;

  return buildPullRequestReviewChecklistResourceTemplate({
    reviewChecklistBulletList,
    pullRequestNumber,
    pullRequestTitle,
    generatedAt,
  });
}
