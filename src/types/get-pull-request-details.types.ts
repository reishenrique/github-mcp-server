export type PullRequestDetailsData = {
  user: {
    login: string;
    id: number;
  };
  number: number;
  url: string;
  title: string;
  body: string;
  created_at: string;
  merged: string;
  merged_by: {
    login: string;
  } | null;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
  state: string;
};

export type PullRequestDetailsOutput = {
  from: string;
  number: number;
  url: string;
  title: string;
  description: string | null;
  createdAt: string;
  isMerged: boolean;
  mergedBy: string | null;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
  state: string;
};
