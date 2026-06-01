import { SummarizePullRequestCacheValue } from '../cache/summary-pull-request.cache.js';
import { buildPullRequestSummaryTemplate } from '../resource-templates/summary-pull-request.resource-template.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';

export function formatPullRequestSummaryResource({
  summary,
  generatedAt,
}: SummarizePullRequestCacheValue): string {
  const risks = buildBulletList(summary.risks, 'No significant risks detected');

  const recommendations = buildBulletList(summary.recommendations, 'No recommendations');

  const maxFilesToShow = 10;

  const hasMoreFiles = summary.changedFiles.length > maxFilesToShow;

  const changedFiles = summary.changedFiles
    .slice(0, maxFilesToShow)
    .map((file) => `- ${file}`)
    .join('\n');

  return buildPullRequestSummaryTemplate({
    summary,
    risks,
    recommendations,
    maxFilesToShow,
    hasMoreFiles,
    changedFiles,
    generatedAt,
  });
}
