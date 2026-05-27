import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatIssueDetailsOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  issueTitle: z.string(),
  body: z.string().optional(),
});

const outputSchema = z.object({
  issueUrl: z.string(),
  issueNumber: z.number(),
  repositoryUrl: z.string(),
  title: z.string(),
  user: z.string(),
  state: z.enum(['open', 'closed']),
  body: z.string().nullable(),
});

export function registerCreateIssueTool(server: McpServer) {
  server.registerTool(
    'create-issue',
    {
      description: 'Creates a new issue in a specific GitHub repository',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, issueTitle, body }: z.infer<typeof inputSchema>) => {
      try {
        const response = await gitHubApi.post(`/repos/${owner}/${repositoryName}/issues`, {
          title: issueTitle,
          body,
        });

        const issueDetails = formatIssueDetailsOutput(response.data);

        return {
          structuredContent: issueDetails,
          content: [
            {
              type: 'text',
              text: JSON.stringify(issueDetails, null, 2),
            },
          ],
        };
      } catch (error: any) {
        console.error(error.response?.data);
        throw error;
      }
    },
  );
}
