import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatPullRequestDetailsOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

const outputSchema = z.object({
  from: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  isMerged: z.boolean(),
  mergedBy: z.string().nullable(),
  commits: z.number(),
  additions: z.number(),
  deletions: z.number(),
  changedFiles: z.number(),
});

export async function registerGetPullRequestDetailsTool(server: McpServer) {
  server.registerTool(
    'get-pull-request-details',
    {
      description: 'Obtaining detailed information about a specific pull request',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(
        `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}`,
      );

      const isMerged = response.data.merged;

      const pullRequestDetails = formatPullRequestDetailsOutput(response.data, isMerged);

      return {
        structuredContent: pullRequestDetails,
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
