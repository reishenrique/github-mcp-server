import axios from 'axios';
import 'dotenv/config';

export const gitHubApi = axios.create({
  baseURL: process.env.GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});
