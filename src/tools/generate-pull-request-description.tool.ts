import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { generatePullRequestDescription } from '../services/pull-requests.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

export function registerGeneratePullRequestDescriptionTool(server: McpServer) {
  server.registerTool(
    'generate-pull-request-description',
    {
      description:
        'Generate a pull request description summarizing implemented changes, risks and recommendations',
      inputSchema: inputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber }: z.infer<typeof inputSchema>) => {
      const description = await generatePullRequestDescription(
        owner,
        repositoryName,
        pullRequestNumber,
      );

      return {
        structuredContent: { description },
        content: [
          {
            type: 'text',
            text: description,
          },
        ],
      };
    },
  );
}
