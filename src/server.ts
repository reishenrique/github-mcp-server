import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListRepositoriesTool } from './tools/list-repositories.tool.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerGetRepositoryInfoTool } from './tools/get-repository-info.tool.js';
import { registerListPullRequestsTool } from './tools/list-pull-requests.tool.js';
import { registerGetPullRequestDetailsTool } from './tools/get-pull-request-details.tool.js';
import { registerSearchCommitsByPullRequestTool } from './tools/search-commits-by-pr.tool.js';
import { registerGetPullRequestFilesTool } from './tools/get-pull-request-files.tool.js';
import { registerCreateIssueTool } from './tools/create-issue.tool.js';
import { registerCreateCommentOnPullRequestTool } from './tools/create-comment-on-pull-request.tool.js';
import { registerGenerateSummaryPullRequestTool } from './tools/generate-summary-pull-request.tool.js';
import { registerSummaryPullRequestResource } from './resources/summary-pull-request.resource.js';
import { registerGeneratePullRequestDescriptionTool } from './tools/generate-pull-request-description.tool.js';
import { registerPullRequestReviewContextPackResource } from './resources/pull-request-review-context.resource.js';

async function startMcpServer() {
  const server = new McpServer({
    name: 'github-mcp-server',
    version: '1.0.0',
  });

  // Tools
  registerListRepositoriesTool(server);
  registerGetRepositoryInfoTool(server);
  registerListPullRequestsTool(server);
  registerGetPullRequestDetailsTool(server);
  registerSearchCommitsByPullRequestTool(server);
  registerGetPullRequestFilesTool(server);
  registerCreateIssueTool(server);
  registerCreateCommentOnPullRequestTool(server);
  registerGenerateSummaryPullRequestTool(server);
  registerGeneratePullRequestDescriptionTool(server);

  // Resources
  registerSummaryPullRequestResource(server);
  registerPullRequestReviewContextPackResource(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startMcpServer();
