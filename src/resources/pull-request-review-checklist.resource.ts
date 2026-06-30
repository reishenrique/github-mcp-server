import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp';
import { getOrCreatePullRequestReviewChecklist } from '../services/pull-requests.service.js';
import { pullRequestReviewChecklistResource } from '../formatters/pull-request-review-checklist-resource.formatter.js';

export function registerPullRequestReviewChecklistResource(server: McpServer) {
  server.registerResource(
    'pull-request-review-checklist',
    new ResourceTemplate('github://review-checklist/{owner}/{repositoryName}/{pullRequestNumber}', {
      list: undefined,
    }),
    {
      description:
        'Provides a structured review checklist highlighting the key validation points for a pull request based on its detected impacts and review context',
    },
    async (uri: any, variables: any) => {
      const reviewChecklist = await getOrCreatePullRequestReviewChecklist(
        variables.owner,
        variables.repositoryName,
        variables.pullRequestNumber,
      );

      return {
        contents: [
          {
            uri: uri.href,
            text: pullRequestReviewChecklistResource(reviewChecklist),
          },
        ],
      };
    },
  );
}
