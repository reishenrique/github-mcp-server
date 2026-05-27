import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import {
  getPullRequestCommits,
  getPullRequestDetails,
  getPullRequestFiles,
} from '../services/pull-requests.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

export function registerGenerateSummaryPullRequestTool(server: McpServer) {
  server.registerTool(
    'generate-pull-request-summary',
    {
      description: 'Generate a structured summary and engineering insights for a pull request',
      inputSchema: inputSchema.shape,
    },
    async ({
      owner,
      repositoryName,
      pullRequestNumber,
    }: z.infer<typeof inputSchema>): Promise<any> => {
      const pullRequestDetails = await getPullRequestDetails(
        owner,
        repositoryName,
        pullRequestNumber,
      );

      const pullRequestFiles = await getPullRequestFiles(owner, repositoryName, pullRequestNumber);

      const commitsByPullRequest = await getPullRequestCommits(
        owner,
        repositoryName,
        pullRequestNumber,
      );
    },
  );
}
