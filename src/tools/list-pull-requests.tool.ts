import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { listPullRequests } from '../services/pull-requests.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
});

const outputSchema = z.object({
  pullRequests: z.array(
    z.object({
      title: z.string(),
      from: z.string(),
    }),
  ),
});

export function registerListPullRequestsTool(server: McpServer) {
  server.registerTool(
    'list-pull-requests',
    {
      description: 'Lists all open pull requests related to specific repository',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName }: z.infer<typeof inputSchema>) => {
      const pullRequests = await listPullRequests(owner, repositoryName);

      return {
        structuredContent: { pullRequests },
        content: [
          {
            type: 'text',
            text: JSON.stringify(pullRequests, null, 2),
          },
        ],
      };
    },
  );
}
