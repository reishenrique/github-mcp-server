import { pullRequestFilesOutput } from '../formatters/get-pull-request-files.formatters.js';
import { pullRequestDetailsOutput } from '../formatters/get-pull-request-details.formatter.js';
import { formatCommitsListOutput } from '../formatters/search-commits-by-pull-request.formatter.js';
import { summarizePullRequestOutput } from '../formatters/summarize-pull-request.formatter.js';
import { buildFileCategories } from '../utils/builders/build-file-categories.utils.js';
import { buildPullRequestInsights } from '../utils/builders/build-pull-request-insights.util.js';
import { getRepositoryInfo } from './repositories.service.js';
import { PullRequestDetailsOutput } from '../types/get-pull-request-details.types.js';
import { CommitFilesOutput } from '../types/get-pull-request-files.types.js';
import { PullRequestCommitOutput } from '../types/search-commits-by-pull-request.types.js';
import { SummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';
import {
  PullRequestContextReviewValue,
  pullRequestReviewChecklistCache,
  PullRequestReviewChecklistValue,
  pullRequestReviewContextCache,
  pullRequestReviewStrategyCache,
  PullRequestReviewStrategyValue,
  summaryPullRequestCache,
} from '../cache/pull-request.cache.js';
import {
  buildPullRequestReviewChecklistCacheKey,
  buildPullRequestReviewContextCacheKey,
  buildPullRequestReviewStrategyCacheKey,
  buildSummaryPullRequestCacheKey,
} from '../utils/builders/build-pull-request-cache-keys.util.js';
import { createCommentOnPullRequestOutput } from '../formatters/create-comment-on-pull-request.formatter.js';
import { buildPullRequestImpactSummary } from '../utils/builders/build-pull-request-affected-areas.util.js';
import { gitHubIntegration } from '../integrations/github.integration.js';
import { pullRequestListOutput } from '../formatters/list-pull-request.formatter.js';
import { PullRequestListDataOutput } from '../types/list-pull-request.types.js';
import { buildReviewFocus } from '../utils/builders/build-review-focus.util.js';
import { buildReviewSignals } from '../utils/builders/build-review-signals.util.js';
import { PullRequestReviewContextOutput } from '../types/pull-request-review-context.type.js';
import { buildReviewChecklist } from '../utils/builders/build-checklist-review.util.js';
import { PullRequestReviewChecklistOutput } from '../types/pull-request-review-checklist.type.js';
import { buildReviewStrategy } from '../utils/builders/build-review-strategy.util.js';
import { PullRequestReviewStrategyOutput } from '../types/pull-request-review-strategy.type.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';
import { buildPullRequestDescriptionTemplate } from '../utils/templates/tools/pull-request-description-template.tool-template.js';

export async function getPullRequestDetails(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestDetailsOutput> {
  const response = await gitHubIntegration.pullRequests.getPullRequestDetails(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const isMerged = response.merged;

  const pullRequestDetails = pullRequestDetailsOutput(response, isMerged);

  return pullRequestDetails;
}

export async function getPullRequestFiles(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<CommitFilesOutput> {
  const response = await gitHubIntegration.pullRequests.getPullRequestFiles(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const pullRequestFiles = pullRequestFilesOutput(response);

  return pullRequestFiles;
}

export async function getPullRequestCommits(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestCommitOutput> {
  const response = await gitHubIntegration.pullRequests.getPullRequestCommits(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const commits = formatCommitsListOutput(owner, repositoryName, pullRequestNumber, response);

  return commits;
}

export async function createCommentOnPullRequest(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
  body: string,
) {
  const response = await gitHubIntegration.pullRequests.createCommentOnPullRequest(
    owner,
    repositoryName,
    pullRequestNumber,
    body,
  );

  const formatCommentOnPullRequest = createCommentOnPullRequestOutput(response);

  return formatCommentOnPullRequest;
}

export async function summarizePullRequest(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
) {
  const repositoryInfo = await getRepositoryInfo(owner, repositoryName);

  const pullRequestDetails = await getPullRequestDetails(owner, repositoryName, pullRequestNumber);

  const pullRequestFiles = await getPullRequestFiles(owner, repositoryName, pullRequestNumber);

  const commitsByPullRequest = await getPullRequestCommits(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const changedFiles = pullRequestFiles.filesNames.map((file) => file.fileName);

  const fileCategories = buildFileCategories(changedFiles);
  const impactSummary = buildPullRequestImpactSummary(changedFiles);

  const mergeCommits = commitsByPullRequest.commits.filter((commit) => commit.isMerge).length;
  const syncCommits = commitsByPullRequest.commits.filter(
    (commit) => commit.mergeType === 'sync',
  ).length;
  const featureCommits = commitsByPullRequest.commits.filter((commit) => !commit.isMerge).length;

  const { risks, recommendations } = buildPullRequestInsights(
    commitsByPullRequest.total,
    pullRequestFiles.totalFiles,
    changedFiles,
    syncCommits,
  );

  const summary = summarizePullRequestOutput(
    repositoryInfo,
    pullRequestDetails,
    pullRequestFiles,
    commitsByPullRequest,
    changedFiles,
    fileCategories,
    impactSummary,
    mergeCommits,
    syncCommits,
    featureCommits,
    { risks, recommendations },
  );

  return summary;
}

export function saveSummaryPullRequestCache(cacheKey: string, summary: SummarizePullRequestOutput) {
  summaryPullRequestCache.set(cacheKey, { summary, generatedAt: new Date().toISOString() });
}

export function getCachedSummaryPullRequest(cacheKey: string) {
  return summaryPullRequestCache.get(cacheKey);
}

export async function getOrCreateSummarizePullRequest(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<SummarizePullRequestOutput> {
  const cacheKey = buildSummaryPullRequestCacheKey(owner, repositoryName, pullRequestNumber);

  const cachedSummary = getCachedSummaryPullRequest(cacheKey);

  if (cachedSummary) return cachedSummary.summary;

  const summary = await summarizePullRequest(owner, repositoryName, pullRequestNumber);

  saveSummaryPullRequestCache(cacheKey, summary);

  return summary;
}

export async function listPullRequests(
  owner: string,
  repositoryName: string,
): Promise<PullRequestListDataOutput> {
  const response = await gitHubIntegration.pullRequests.listPullRequests(owner, repositoryName);

  const pullRequests = pullRequestListOutput(response);

  return pullRequests;
}

export async function generatePullRequestDescription(
  owner: string,
  repisitoryName: string,
  pullRequestNumber: number,
): Promise<string> {
  const summary = await getOrCreateSummarizePullRequest(owner, repisitoryName, pullRequestNumber);

  const impactSummary = buildPullRequestImpactSummary(summary.changedFiles);

  const risks = buildBulletList(summary.risks, 'No significant risks detected');
  const recommendations = buildBulletList(summary.recommendations, 'No recommendations');

  const description = buildPullRequestDescriptionTemplate({
    summary,
    impactSummary,
    risks,
    recommendations,
  });

  return description;
}

// Review Context
export async function generatePullRequestReviewContext(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestReviewContextOutput> {
  const summary = await getOrCreateSummarizePullRequest(owner, repositoryName, pullRequestNumber);

  const pullRequestTitle = summary.pullRequest.title;

  const reviewFocus = buildReviewFocus(summary.impactSummary); // Focus of the pull request review based on impacts
  const reviewSignals = buildReviewSignals(summary.fileCategories, summary.metrics); // These are observations inferred from metrics and structure

  return { reviewFocus, reviewSignals, pullRequestNumber, pullRequestTitle };
}

export async function getOrCreatePullRequestReviewContext(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestReviewContextOutput> {
  const cacheKey = buildPullRequestReviewContextCacheKey(owner, repositoryName, pullRequestNumber);

  const cachedReviewContext = getCachedPullRequestReviewContext(cacheKey);

  if (cachedReviewContext) return cachedReviewContext.reviewContext;

  const reviewContext = await generatePullRequestReviewContext(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  savePullRequestReviewContextCache(cacheKey, reviewContext);

  return reviewContext;
}

export function getCachedPullRequestReviewContext(
  cachedKey: string,
): PullRequestContextReviewValue | undefined {
  return pullRequestReviewContextCache.get(cachedKey);
}

export function savePullRequestReviewContextCache(
  cacheKey: string,
  reviewContext: PullRequestReviewContextOutput,
): void {
  pullRequestReviewContextCache.set(cacheKey, {
    reviewContext,
    generatedAt: new Date().toISOString(),
  });
}

// Review Checklist
export async function generatePullRequestReviewChecklist(
  owner: string,
  repositoryName: string,
  prNumber: number,
): Promise<PullRequestReviewChecklistOutput> {
  const reviewContext = await getOrCreatePullRequestReviewContext(owner, repositoryName, prNumber);

  const { reviewFocus, pullRequestNumber, pullRequestTitle } = reviewContext;

  const reviewChecklist = buildReviewChecklist(reviewFocus);

  return { reviewChecklist, pullRequestNumber, pullRequestTitle };
}

export function getCachedPullRequestReviewChecklist(
  cacheKey: string,
): PullRequestReviewChecklistValue | undefined {
  return pullRequestReviewChecklistCache.get(cacheKey);
}

export function savePullRequestReviewChecklistCache(
  cacheKey: string,
  value: PullRequestReviewChecklistValue,
): void {
  pullRequestReviewChecklistCache.set(cacheKey, value);
}

export async function getOrCreatePullRequestReviewChecklist(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestReviewChecklistValue> {
  const cacheKey = buildPullRequestReviewChecklistCacheKey(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const cachedReviewChecklist = getCachedPullRequestReviewChecklist(cacheKey);

  if (cachedReviewChecklist) return cachedReviewChecklist;

  const output = await generatePullRequestReviewChecklist(owner, repositoryName, pullRequestNumber);

  const value = {
    output,
    generatedAt: new Date().toISOString(),
  };

  savePullRequestReviewChecklistCache(cacheKey, value);

  return value;
}

// Review Strategy
export async function generatePullRequestReviewStrategy(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestReviewStrategyOutput> {
  const pullRequestReviewChecklist = await getOrCreatePullRequestReviewContext(
    owner,
    repositoryName,
    pullRequestNumber,
  );

  const { reviewFocus, pullRequestTitle } = pullRequestReviewChecklist;

  const reviewStrategy = buildReviewStrategy(reviewFocus);

  return { reviewStrategy, pullRequestNumber, pullRequestTitle };
}

export function getCachedPullRequestReviewStrategy(
  cacheKey: string,
): PullRequestReviewStrategyValue | undefined {
  return pullRequestReviewStrategyCache.get(cacheKey);
}

export function savePullRequestReviewStrategy(
  cacheKey: string,
  value: PullRequestReviewStrategyValue,
): void {
  pullRequestReviewStrategyCache.set(cacheKey, value);
}

export async function getOrCreatePullRequestReviewStrategy(
  owner: string,
  repositoryName: string,
  pullRequestNumber: number,
): Promise<PullRequestReviewStrategyValue> {
  const cacheKey = buildPullRequestReviewStrategyCacheKey(owner, repositoryName, pullRequestNumber);

  const cachedReviewStrategy = getCachedPullRequestReviewStrategy(cacheKey);

  if (cachedReviewStrategy) return cachedReviewStrategy;

  const output = await generatePullRequestReviewStrategy(owner, repositoryName, pullRequestNumber);

  const value = {
    output,
    generatedAt: new Date().toISOString(),
  };

  savePullRequestReviewStrategy(cacheKey, value);

  return value;
}
