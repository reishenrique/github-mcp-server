import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatCommitsListOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

export function registerSearchCommitsByPullRequestTool(server: McpServer) {
  server.registerTool(
    'search-commits-by-pull-request',
    {
      description: 'Search for all commits related to an pull request in a repository',
      inputSchema: inputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(
        `/repos/${owner}/${repositoryName}/pulls/${pullRequestNumber}/commits`,
      );
      const commits = formatCommitsListOutput(
        owner,
        repositoryName,
        pullRequestNumber,
        response.data,
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(commits, null, 2),
          },
        ],
      };
    },
  );
}
