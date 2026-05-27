export type PullRequestInfo = {
  title: string;
  user: {
    login: string;
  };
};

export type FormattedPullRequestListOutput = {
  title: string;
  from: string;
}[];

export type GitHubPRCommit = {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      url: string;
      sha: string;
    };
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
      verified_at: string | null;
    };
  };
  author: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
  } | null;
  committer: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
  } | null;
  parents: Array<{
    sha: string;
    url: string;
  }>;
};

export type FormattedCommitOutput = {
  repository: {
    owner: string;
    name: string;
  };
  pullRequestNumber: number;
  total: number;
  commits: Array<{
    sha: string;
    shortSha: string;
    message: string;
    title: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    url: string;
    isMerge: boolean;
    stats?: {
      additions: number;
      deletions: number;
      total: number;
    };
  }>;
};

export type CommitFiles = {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url?: string;
  raw_url?: string;
  contents_url?: string;
  patch?: string;
};

export type FormattedCommitFile = Pick<
  CommitFiles,
  'sha' | 'status' | 'additions' | 'deletions' | 'changes'
> & {
  fileName: string;
};

export type FormattedCommitFilesOutput = {
  totalFiles: number;
  filesNames: FormattedCommitFile[];
};

export type PullRequestDataInfo = {
  user: {
    login: string;
    id: number;
  };
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
};

export type FormattedPullRequestDetails = {
  from: string;
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
};

export type MergeType = 'sync' | 'pull_request' | 'unknown' | 'none';
