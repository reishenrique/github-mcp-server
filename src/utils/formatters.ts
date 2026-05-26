import { PullRequestInfo } from './types.js';

export function formatPullRequestOutput(data: PullRequestInfo[]): string {
  const formattedOutput = data.map((pr) => `- ${pr.title} (from: ${pr.user.login})`).join('\n');

  return formattedOutput;
}
