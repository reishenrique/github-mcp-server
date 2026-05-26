import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatPullRequestOutput } from '../utils/formatters.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
});

export function registerListPullRequestsTool(server: any) {
  server.tool(
    'list-pull-requests',
    'Lists all open pull requests related to specific repository',
    inputSchema.shape,
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
