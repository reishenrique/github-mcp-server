import { FileCategories } from '../utils/builders/build-file-categories.utils.js';

export type Repository = {
  owner: string;
  repositoryName: string;
};

export type PullRequest = {
  number: number;
  title: string;
  state: string;
  author: string;
  createdAt: string;
  merged: boolean;
};

export type Metrics = {
  totalFiles: number;
  totalCommits: number;
  additions: number;
  deletions: number;
  changes: number;
};

export type CommitsInsights = {
  mergeCommits: number;
  syncCommits: number;
  featureCommits: number;
};

export type SummarizePullRequestOutput = {
  repository: Repository;
  pullRequest: PullRequest;
  metrics: Metrics;
  changedFiles: string[];
  fileCategories: FileCategories;
  impactSummary: string[];
  commitsInsights: CommitsInsights;
  summary: string;
  risks: string[];
  recommendations: string[];
};
