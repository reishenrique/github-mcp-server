import { FileCategories } from './build-file-categories.utils.js';

export function buildPullRequestNarrativeSummary(
  title: string,
  fileCategories: FileCategories,
): string {
  const parts: string[] = [];

  if (fileCategories.sourceFiles > 0) {
    parts.push('introduces changes to application source code');
  }

  if (fileCategories.testsFiles > 0) {
    parts.push('includes test updates');
  }

  if (fileCategories.documentationFiles > 0) {
    parts.push('updates documentation');
  }

  if (fileCategories.ciFiles > 0) {
    parts.push('modifies CI/CD configuration');
  }

  return `Pull request "${title}" ${parts.join(', ')}.`;
}
