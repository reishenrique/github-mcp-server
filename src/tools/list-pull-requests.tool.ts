import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatPullRequestOutput } from '../utils/formatters.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
});

export function registerListPullRequestsTool(server: McpServer) {
  server.registerTool(
    'list-pull-requests',
    {
      description: 'Lists all open pull requests related to specific repository',
      inputSchema: inputSchema.shape,
    },
    async ({ owner, repositoryName }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}/pulls`);
      const pullRequests = formatPullRequestOutput(response.data);

      return {
        content: [
          {
            type: 'text',
            text: pullRequests,
          },
        ],
      };
    },
  );
}
