import { CommitFiles, FormattedCommitFilesOutput } from '../utils/types.js';

export function formatPullRequestFilesOutput(
  commitFiles: CommitFiles[],
): FormattedCommitFilesOutput {
  return {
    totalFiles: commitFiles.length,
    filesNames: commitFiles.map((files: CommitFiles) => {
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
