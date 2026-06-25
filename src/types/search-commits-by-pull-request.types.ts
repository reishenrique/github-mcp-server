export type PullRequestCommitData = {
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

export type PullRequestCommitOutput = {
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
    mergeType?: string;
  }>;
};
