import { CommitFilesData, CommitFilesOutput } from '../types/get-pull-request-files.types.js';

export function pullRequestFilesOutput(commitFiles: CommitFilesData[]): CommitFilesOutput {
  return {
    totalFiles: commitFiles.length,
    files: commitFiles.map((files: CommitFilesData) => {
      return {
        sha: files.sha,
        fileName: files.filename,
        status: files.status,
        additions: files.additions,
        deletions: files.deletions,
        changes: files.changes,
      };
    }),
  };
}
