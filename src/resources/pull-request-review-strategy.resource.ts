import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp';
import { getOrCreatePullRequestReviewStrategy } from '../services/pull-requests.service.js';
import { pullRequestReviewStrategyResource } from '../formatters/pull-request-review-strategy-resource.formatter.js';

export function registerPullRequestReviewStrategyResource(server: McpServer) {
  server.registerResource(
    'pull-request-review-strategy',
    new ResourceTemplate('github://review-strategy/{owner}/{repositoryName}/{pullRequestNumber}', {
      list: undefined,
    }),
    {
      description:
        'Provides a pull request review strategy based on the previously generated checklist.',
    },
    async (uri: any, varibles: any) => {
      const reviewStrategy = await getOrCreatePullRequestReviewStrategy(
        varibles.owner,
        varibles.repositoryName,
        varibles.pullRequestNumber,
      );

      return {
        contents: [
          {
            uri: uri.href,
            text: pullRequestReviewStrategyResource(reviewStrategy),
          },
        ],
      };
    },
  );
}
