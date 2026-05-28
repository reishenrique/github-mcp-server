import { FormattedIssueDataOutput, IssueData } from '../types/create-issue.types.js';

export function formatIssueDetailsOutput(issueData: IssueData): FormattedIssueDataOutput {
  const formattedIssueDetailsOutput = {
    issueUrl: issueData.url,
    issueNumber: issueData.number,
    repositoryUrl: issueData.repository_url,
    title: issueData.title,
    user: issueData.user.login,
    state: issueData.state,
    body: issueData.body,
  };

  return formattedIssueDetailsOutput;
}
