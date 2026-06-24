import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp';
import { getOrCreateSummarizePullRequest } from '../services/pull-requests.service.js';
import { formatPullRequestSummaryResource } from '../formatters/summarize-pull-request-resource.formatter.js';

export function registerSummaryPullRequestResource(server: McpServer) {
  server.registerResource(
    'summary-pull-request',
    new ResourceTemplate(
      'github://summary-pull-request/{owner}/{repositoryName}/{pullRequestNumber}',
      {
        list: undefined,
      },
    ),
    {
      description:
        'Provides a structured pull request summary resource after they have been generated once by the tool',
    },
    async (uri: any, variables: any) => {
      const summary = await getOrCreateSummarizePullRequest(
        variables.owner,
        variables.repositoryName,
        variables.pullRequestNumber,
      );

      const generatedAt = new Date().toISOString();

      return {
        contents: [
          {
            uri: uri.href,
            text: formatPullRequestSummaryResource({ summary, generatedAt }),
          },
        ],
      };
    },
  );
}
