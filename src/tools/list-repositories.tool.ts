import { z } from "zod";
import { gitHubApi } from "../services/github.service.js";

const inputSchema = z.object({
    username: z.string()
})

export function registerListRepositoriesTool(server: any) {
    server.tool(
        "list-repositories",
        "Given a GitHub username, lists all public repositories of that user, returning the repository names.", 
        inputSchema.shape,
        async ({ username }: z.infer<typeof inputSchema>) => {
            const response = await gitHubApi.get(`/users/${username}/repos`);
            const repos = response.data.map((repo: any) => `- ${repo.name}`).join("\n");

            return {
                content: [{
                    type: "text",
                    text: repos
                }]
            }
        }
    )
}