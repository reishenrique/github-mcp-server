import axios from 'axios';

export function handleGitHubError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? error.message;

    throw new Error(`GitHub API Error (${status}): ${message}`);
  }

  throw error
}
