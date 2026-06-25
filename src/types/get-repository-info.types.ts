export type RepositoryData = {
  name: string;
  private: boolean;
  html_url: string;
  language: string;
  default_branch: string;
  owner: {
    login: string;
  };
};

export type RepositoryInfoOutput = {
  repositoryName: string;
  isPrivate: boolean;
  owner: string;
  url: string;
  language: string;
  defaultBranch: string;
};
