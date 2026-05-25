
import z from "zod";
import { gitHubApi } from "../services/github.service.js";

const inputSchema = z.object({
    owner: z.string(),
    repositoryName: z.string()
})

interface RepositoryInfo {
    repositoryName: string;
    isPrivate: boolean;
    owner: string;
    url: string;
    language: string;
    defaultBranch: string;

}

export function registerGetRepositoryInfoTool(server: any) {
    server.tool(
        "get-repository",
        "Given an owner and repository name, retrieves detailed information about a specific GitHub repository, including name, visibility, owner, URL, primary language and default branch.",
        inputSchema.shape,
        async ({ owner, repositoryName }: z.infer<typeof inputSchema>) => {
            const response = await gitHubApi.get(`/repos/${owner}/${repositoryName}`)
            const data = response.data

            const repoInfo: RepositoryInfo = {
                repositoryName: data.name,
                isPrivate: data.private,
                owner: data.owner.login,
                url: data.html_url,
                language: data.language,
                defaultBranch: data.default_branch,
            };
            
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(repoInfo, null, 2)
                }]
            }
        }
    )
}