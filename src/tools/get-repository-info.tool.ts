import z from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { formatGetRepositoryInfoOutput } from '../utils/formatters.util.js';

const inputSchema = z.object({
  owner: z.string(),
  repositoryName: z.string(),
});

const outputSchema = z.object({
  repositoryName: z.string(),
  isPrivate: z.boolean(),
  owner: z.string(),
  url: z.string(),
  language: z.string(),
  defaultBranch: z.string(),
});

export function registerGetRepositoryInfoTool(server: McpServer) {
  server.registerTool(
    'get-repository-info',
    {
      description:
        'Given an owner and repository name, retrieves detailed information about a specific GitHub repository, including name, visibility, owner, URL, primary language and default branch.',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}`);

      const repositoryInfo = formatGetRepositoryInfoOutput(response.data);

      return {
        structuredContent: repositoryInfo,
        content: [
          {
            type: 'text',
            text: JSON.stringify(repositoryInfo, null, 2),
          },
        ],
      };
    },
  );
}
