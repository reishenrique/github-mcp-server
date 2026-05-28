import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { getPullRequestCommits } from '../services/pull-requests.service.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

const outputSchema = z.object({
  repository: z.object({
    owner: z.string(),
    name: z.string(),
  }),
  pullRequestNumber: z.number(),
  total: z.number(),
  commits: z.array(
    z.object({
      sha: z.string(),
      shortSha: z.string(),
      message: z.string(),
      title: z.string(),
      author: z.object({
        name: z.string(),
        email: z.string(),
        date: z.string(),
      }),
      url: z.string(),
      isMerge: z.boolean(),
      mergeType: z.string().optional(),
      stats: z
        .object({
          additions: z.number(),
          deletions: z.number(),
          total: z.number(),
        })
        .optional(),
    }),
  ),
});

export function registerSearchCommitsByPullRequestTool(server: McpServer) {
  server.registerTool(
    'search-commits-by-pull-request',
    {
      description: 'Search for all commits related to an pull request in a repository',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName, pullRequestNumber }: z.infer<typeof inputSchema>) => {
      const commits = await getPullRequestCommits(owner, repositoryName, pullRequestNumber);

      return {
        structuredContent: commits,
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
