import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp';
import { getCachedSummaryPullRequest } from '../services/pull-requests.service.js';
import { buildSummaryPullRequestCacheKey } from '../utils/builders/build-pull-request-cache-keys.util.js';
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
      const cacheKey = buildSummaryPullRequestCacheKey(
        variables.owner,
        variables.repositoryName,
        variables.pullRequestNumber,
      );

      const cachedSummary = getCachedSummaryPullRequest(cacheKey);

      if (!cachedSummary) throw new Error('Pull request summary not generated yet');

      const formatSummaryToComprehensionContext = formatPullRequestSummaryResource(cachedSummary);

      return {
        contents: [
          {
            uri: uri.href,
            text: formatSummaryToComprehensionContext,
          },
        ],
      };
    },
  );
}
