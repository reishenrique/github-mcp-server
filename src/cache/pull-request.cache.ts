import { PullRequestReviewContextOutput } from '../types/pull-request-review-context.type.js';
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
