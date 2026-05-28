export type CommentOnPullRequestData = {
  url: string;
  issue_url: string;
  user: {
    login: string;
  };
  created_at: string;
  body: string;
};

export type FormattedCommentOnPullRequestOutput = {
  pullRequestUrl: string;
  issueUrl: string;
  user: string;
  createdAt: string;
  body: string;
};
