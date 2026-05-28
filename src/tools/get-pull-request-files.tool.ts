import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { getPullRequestFiles } from '../services/pull-requests.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
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

export function registerGetPullRequestFilesTool(server: McpServer) {
  server.registerTool(
    'get-pull-request-files',
    {
      description: 'Lists all files present in a specific pull request',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber }: z.infer<typeof inputSchema>) => {
      const pullRequestFiles = await getPullRequestFiles(owner, repositoryName, pullRequestNumber);

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
