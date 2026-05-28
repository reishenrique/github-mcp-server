export function buildPullRequestInsights(
  totalCommits: number,
  totalFiles: number,
  changedFiles: string[],
  syncCommits: number,
): { risks: string[]; recommendations: string[] } {
  const risks: string[] = [];
  const recommendations: string[] = [];

  const LARGE_COMMIT_COUNT = 15;
  const MANY_FILES_COUNT = 20;

  if (totalCommits > LARGE_COMMIT_COUNT) {
    risks.push('Large pull request with high volume of commits');
    recommendations.push('Consider squashing commits before merge');
  }

  if (totalFiles > MANY_FILES_COUNT) {
    risks.push('Pull request affects many files');
    recommendations.push('Perform a detailed review due to large change scope');
  }

  const hasWorkflowChanges = changedFiles.some((file) => file.includes('.github/workflows'));

  if (hasWorkflowChanges) {
    risks.push('CI/CD workflow files were modified');
    recommendations.push('Validate CI/CD workflows after merge');
  }

  const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

  const hasLockFileChange = changedFiles.some((file) =>
    lockFiles.some((lockFile) => file.includes(lockFile)),
  );

  if (hasLockFileChange) {
    risks.push('Pull request includes lock file changes');
    recommendations.push('Review dependency updates and lock file consistency');
  }

  if (syncCommits > 3) {
    risks.push('Pull request contains multiple synchronization merges');
  }

  return { risks, recommendations };
}
