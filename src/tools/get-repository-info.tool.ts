import z from 'zod';
import { gitHubApi } from '../services/github.service.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';

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
    'get-repository',
    {
      description:
        'Given an owner and repository name, retrieves detailed information about a specific GitHub repository, including name, visibility, owner, URL, primary language and default branch.',
      inputSchema: inputSchema.shape,
      outputSchema: outputSchema.shape,
    },
    async ({ owner, repositoryName }: z.infer<typeof inputSchema>) => {
      const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}`);
      const data = response.data;

      const repoInfo: z.infer<typeof outputSchema> = {
        repositoryName: data.name,
        isPrivate: data.private,
        owner: data.owner.login,
        url: data.html_url,
        language: data.language,
        defaultBranch: data.default_branch,
      };

      return {
        structuredContent: repoInfo,
        content: [
          {
            type: 'text',
            text: JSON.stringify(repoInfo, null, 2),
          },
        ],
      };
    },
  );
}
