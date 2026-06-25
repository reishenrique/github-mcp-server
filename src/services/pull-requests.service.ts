import { formatPullRequestFilesOutput } from '../formatters/get-pull-request-files.formatters.js';
import { pullRequestDetailsOutput } from '../formatters/get-pull-request-details.formatter.js';
import { formatCommitsListOutput } from '../formatters/search-commits-by-pull-request.formatter.js';
import { formatSummarizePullRequestOutput } from '../formatters/summarize-pull-request.formatter.js';
import { buildFileCategories } from '../utils/builders/build-file-categories.utils.js';
import { buildPullRequestInsights } from '../utils/builders/build-pull-request-insights.util.js';
import { getRepositoryInfo } from './repositories.service.js';
import { PullRequestDetailsOutput } from '../types/get-pull-request-details.types.js';
import { CommitFilesOutput } from '../types/get-pull-request-files.types.js';
import { PullRequestCommitOutput } from '../types/search-commits-by-pr.types.js';
import { SummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';
import {
  PullRequestContextReviewValue,
  pullRequestReviewContextCache,
  summaryPullRequestCache,
} from '../cache/pull-request.cache.js';
import {
  buildPullRequestReviewContextCacheKey,
  buildSummaryPullRequestCacheKey,
} from '../utils/builders/build-pull-request-cache-keys.util.js';
import { createCommentOnPullRequestOutput } from '../formatters/create-comment-on-pull-request.formatter.js';
import { buildPullRequestImpactSummary } from '../utils/builders/build-pull-request-affected-areas.util.js';
import { gitHubIntegration } from '../integrations/github.integration.js';
import { pullRequestListOutput } from '../formatters/list-pull-request.formatters.js';
import { PullRequestListDataOutput } from '../types/list-pull-request.types.js';
import { buildReviewFocus } from '../utils/builders/build-review-focus.util.js';
import { buildReviewSignals } from '../utils/builders/build-review-signals.util.js';
import { PullRequestReviewContextOutput } from '../types/pull-request-review-context.type.js';

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

  const pullRequestFiles = formatPullRequestFilesOutput(response);

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

  const changedFiles = pullRequestFiles.files.map((file) => file.fileName);

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

  const summary = formatSummarizePullRequestOutput(
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
