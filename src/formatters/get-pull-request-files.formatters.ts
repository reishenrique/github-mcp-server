import { CommitFiles, FormattedCommitFilesOutput } from '../types/get-pull-request-files.types.js';

export function formatPullRequestFilesOutput(
  commitFiles: CommitFiles[],
): FormattedCommitFilesOutput {
  return {
    totalFiles: commitFiles.length,
    files: commitFiles.map((files: CommitFiles) => {
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
