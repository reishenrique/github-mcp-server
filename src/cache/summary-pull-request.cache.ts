import { FormatSummarizePullRequestOutput } from '../types/summarize-pull-request.type.js';

export type SummarizePullRequestCacheValue = {
  summary: FormatSummarizePullRequestOutput;
  generatedAt: string;
};

export const summaryPullRequestCache = new Map<string, SummarizePullRequestCacheValue>();
