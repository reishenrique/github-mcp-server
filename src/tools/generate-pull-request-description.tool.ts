import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { getOrCreateSummarizePullRequest } from '../services/pull-requests.service.js';
import { buildPullRequestDescriptionTemplate } from '../utils/templates/tools/pull-request-description-template.tool-template.js';
import { buildPullRequestNarrativeSummary } from '../utils/builders/build-pull-request-narrative-summary.util.js';
import { buildBulletList } from '../utils/builders/build-bullet-list.util.js';

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
      const summary = await getOrCreateSummarizePullRequest(
        owner,
        repositoryName,
        pullRequestNumber,
      );

      const narrativeSummary = buildPullRequestNarrativeSummary(
        summary.pullRequest.title,
        summary.fileCategories,
      );

      const risks = buildBulletList(summary.risks, 'No significant risks detected');
      const recommendations = buildBulletList(summary.recommendations, 'No recommendations');

      const description = buildPullRequestDescriptionTemplate({
        summary,
        narrativeSummary,
        risks,
        recommendations,
      });

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
