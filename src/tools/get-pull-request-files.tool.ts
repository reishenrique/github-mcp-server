import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { formatPullRequestFilesOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullNumber: z.number(),
});

const outputSchema = z.object({
  totalFiles: z.number(),
  filesNames: z.array(
    z.object({
      sha: z.string(),
      fileName: z.string(),
      status: z.string(),
      additions: z.number(),
      deletions: z.number(),
      changes: z.number(),
    }),
  ),
});

export async function registerGetPullRequestFilesTool(server: McpServer) {
  server.registerTool(
    'get-pull-request-files',
    {
      description: 'Lists all files present in a specific pull request',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, pullNumber }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(
        `/repos/${owner}/${repositoryName}/pulls/${pullNumber}/files`,
      );

      const pullRequestFiles = formatPullRequestFilesOutput(response.data);

      return {
        structuredContent: pullRequestFiles,
        content: [
          {
            type: 'text',
            text: JSON.stringify(pullRequestFiles, null, 2),
          },
        ],
      };
    },
  );
}
