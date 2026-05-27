import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  issueNumber: z.string(),
  body: z.string(),
});

export async function registerCreateCommentOnPullRequestTool(server: McpServer) {
  server.registerTool(
    'comment-on-pull-request',
    {
      description: 'Creates a comment on a specific pull request',
      inputSchema: inputSchema.shape,
    },
    async ({ owner, repositoryName, issueNumber, body }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.post(
        `/repos/${owner}/${repositoryName}/issues/${issueNumber}`,
        {
          body,
        },
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data),
          },
        ],
      };
    },
  );
}
