import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { listRepositories } from '../services/repositories.service.js';

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
      const repos = await listRepositories(username);

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
