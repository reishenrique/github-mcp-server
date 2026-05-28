export type FormatSummarizePullRequestOutput = {
  repository: {
    owner: string;
    repositoryName: string;
  };
  pullRequest: {
    number: number;
    title: string;
    state: string;
    author: string;
    createdAt: string;
    merged: boolean;
  };
  metrics: {
    totalFiles: number;
    totalCommits: number;
    additions: number;
    deletions: number;
    changes: number;
  };
  changedFiles: string[];
  fileCategories: {
    sourceFiles?: number;
    testsFiles?: number;
    documentationFiles?: number;
    ciFiles?: number;
    configutarionFiles?: number;
    contextFiles?: number;
  };
  commitsInsights: {
    mergeCommits: number;
    syncCommits: number;
    featureCommits: number;
  };
  summary: string;
  risks: string[];
  recommendations: string[];
};
