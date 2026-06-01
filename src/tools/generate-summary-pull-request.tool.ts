import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { getOrCreateSummarizePullRequest } from '../services/pull-requests.service.js';
import { z } from 'zod';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
  pullRequestNumber: z.number(),
});

const outputSchema = z.object({
  repository: z.object({
    owner: z.string(),
    repositoryName: z.string(),
  }),
  pullRequest: z.object({
    number: z.number(),
    title: z.string(),
    state: z.string(),
    author: z.string(),
    createdAt: z.string(),
    merged: z.boolean(),
  }),
  metrics: z.object({
    totalFiles: z.number(),
    totalCommits: z.number(),
    additions: z.number(),
    deletions: z.number(),
    changes: z.number(),
  }),
  changedFiles: z.array(z.string()),
  fileCategories: z
    .object({
      sourceFiles: z.number(),
      testsFiles: z.number(),
      documentationFiles: z.number(),
      ciFiles: z.number(),
      configutarionFiles: z.number(),
      contextFiles: z.number(),
    })
    .optional(),
  commitsInsights: z.object({
    mergeCommits: z.number(),
    syncCommits: z.number(),
    featureCommits: z.number(),
  }),
  summary: z.string(),
  risks: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export function registerGenerateSummaryPullRequestTool(server: McpServer) {
  server.registerTool(
    'generate-pull-request-summary',
    {
      description: 'Generate a structured summary and engineering insights for a pull request',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({
      owner,
      repositoryName,
      pullRequestNumber,
    }: z.infer<typeof inputSchema>): Promise<any> => {
      const summary = await getOrCreateSummarizePullRequest(
        owner,
        repositoryName,
        pullRequestNumber,
      );

      return {
        structuredContent: summary,
        content: [
          {
            type: 'text',
            text: JSON.stringify(summary, null, 2),
          },
        ],
      };
    },
  );
}
