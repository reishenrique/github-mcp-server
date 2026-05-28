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
