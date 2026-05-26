import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullNumber: z.number(),
});

interface PullRequestDetails {
  from: string;
  url: string;
  title: string;
  description: string;
  createdAt: Date;
  isMerged: boolean;
  mergedBy: string | null;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
}

export async function registerGetPullRequestDetailsTool(server: McpServer) {
  server.registerTool(
    'get-pull-request-details',
    {
      description: 'Obtaining detailed information about a specific pull request',
      inputSchema: inputSchema.shape,
    },
    async ({ owner, repositoryName, pullNumber }) => {
      const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}/pulls/${pullNumber}`);

      const isMerged = response.data.merged;

      const pullRequestDetails: PullRequestDetails = {
        from: response.data.user.login,
        url: response.data.url,
        title: response.data.title,
        description: response.data.body,
        createdAt: response.data.created_at,
        isMerged,
        mergedBy: isMerged ? (response.data.merged_by?.login ?? null) : null,
        commits: response.data.commits,
        additions: response.data.additions,
        deletions: response.data.deletions,
        changedFiles: response.data.changed_files,
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(pullRequestDetails, null, 2),
          },
        ],
      };
    },
  );
}
