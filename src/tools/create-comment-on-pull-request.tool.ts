import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { createCommentOnPullRequest } from '../services/pull-requests.service.js';

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
      const comment = await createCommentOnPullRequest(
        owner,
        repositoryName,
        pullRequestNumber,
        body,
      );

      return {
        structuredContent: comment,
        content: [
          {
            type: 'text',
            text: JSON.stringify(comment, null, 2),
          },
        ],
      };
    },
  );
}
