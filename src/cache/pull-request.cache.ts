import { PullRequestReviewChecklistOutput } from '../types/pull-request-review-checklist.type.js';
import { PullRequestReviewContextOutput } from '../types/pull-request-review-context.type.js';
import { PullRequestReviewStrategyOutput } from '../types/pull-request-review-strategy.type.js';
import { SummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';

export type SummarizePullRequestCacheValue = {
  summary: SummarizePullRequestOutput;
  generatedAt: string;
};

export const summaryPullRequestCache = new Map<string, SummarizePullRequestCacheValue>();

export type PullRequestContextReviewValue = {
  reviewContext: PullRequestReviewContextOutput;
  generatedAt: string;
};

export const pullRequestReviewContextCache = new Map<string, PullRequestContextReviewValue>();

export type PullRequestReviewChecklistValue = {
  output: PullRequestReviewChecklistOutput;
  generatedAt: string;
};

export const pullRequestReviewChecklistCache = new Map<string, PullRequestReviewChecklistValue>();

export type PullRequestReviewStrategyValue = {
  output: PullRequestReviewStrategyOutput;
  generatedAt: string;
};

export const pullRequestReviewStrategyCache = new Map<string, PullRequestReviewStrategyValue>();
