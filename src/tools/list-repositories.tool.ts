import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';

const inputSchema = z.object({
  username: z.string(),
});

export function registerListRepositoriesTool(server: McpServer) {
  server.registerTool(
    'list-repositories',
    {
      description:
        'Given a GitHub username, lists all public repositories of that user, returning the repository names.',
      inputSchema: inputSchema.shape,
    },
    async ({ username }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(`/users/${username}/repos`);
      const repos = response.data.map((repo: any) => `- ${repo.name}`).join('\n');

      return {
        content: [
          {
            type: 'text',
            text: repos,
          },
        ],
      };
    },
  );
}
