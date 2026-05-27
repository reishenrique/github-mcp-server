import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatCommentOnPullRequestOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
  body: z.string(),
});

const outputSchema = z.object({
  pullRequestUrl: z.string(),
  issueUrl: z.string(),
  user: z.string(),
  createdAt: z.string(),
  body: z.string(),
});

export async function registerCreateCommentOnPullRequestTool(server: McpServer) {
  server.registerTool(
    'comment-on-pull-request',
    {
      description: 'Creates a comment on a specific pull request',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber, body }: z.infer<typeof inputSchema>) => {
      try {
        const response = await gitHubApi.post(
          `/repos/${owner}/${repositoryName}/issues/${pullRequestNumber}/comments`,
          {
            body,
          },
        );

        const formatCommentOnPullRequest = formatCommentOnPullRequestOutput(response.data);

        return {
          structuredContent: formatCommentOnPullRequest,
          content: [
            {
              type: 'text',
              text: JSON.stringify(formatCommentOnPullRequest, null, 2),
            },
          ],
        };
      } catch (error: any) {
        throw error;
      }
    },
  );
}
