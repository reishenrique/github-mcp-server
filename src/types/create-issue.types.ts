export type IssueData = {
  url: string;
  repository_url: string;
  title: string;
  state: string;
  body: string;
  user: {
    login: string;
  };
  number: number;
};

export type FormattedIssueDataOutput = {
  issueUrl: string;
  repositoryUrl: string;
  title: string;
  user: string;
  state: string;
  body: string;
};
