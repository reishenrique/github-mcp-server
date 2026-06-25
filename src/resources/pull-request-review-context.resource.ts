import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp';
import { getOrCreatePullRequestReviewContext } from '../services/pull-requests.service.js';
import { pullRequestReviewContextResource } from '../formatters/pull-request-review-context-resource.formatter.js';

export function registerPullRequestReviewContextResource(server: McpServer) {
  server.registerResource(
    'pull-request-review-context',
    new ResourceTemplate(
      'github://pull-request-review-context/{owner}/{repositoryName}/{pullRequestNumber}',
      {
        list: undefined,
      },
    ),
    {
      description:
        'Provides structured context to guide a code review by an LLM, reusing data already consolidated by the PR Summary and enriching it with inspection focuses and review signals',
    },
    async (uri: any, variables: any) => {
      const reviewContext = await getOrCreatePullRequestReviewContext(
        variables.owner,
        variables.repositoryName,
        variables.pullRequestNumber,
      );

      const generatedAt = new Date().toISOString();

      return {
        contents: [
          {
            uri: uri.href,
            text: pullRequestReviewContextResource({ reviewContext, generatedAt }),
          },
        ],
      };
    },
  );
}
