export type PullRequestData = {
  title: string;
  user: {
    login: string;
  };
};

export type PullRequestListDataOutput = {
  title: string;
  from: string;
}[];
