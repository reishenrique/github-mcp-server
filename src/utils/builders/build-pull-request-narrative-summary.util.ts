import { FileCategories } from './build-file-categories.utils.js';

export function buildPullRequestNarrativeSummary(
  title: string,
  fileCategories: FileCategories,
): string {
  const parts: string[] = [];

  if (fileCategories.sourceFiles > 0) {
    parts.push('application source code');
  }

  if (fileCategories.testsFiles > 0) {
    parts.push('test files');
  }

  if (fileCategories.documentationFiles > 0) {
    parts.push('documentation');
  }

  if (fileCategories.ciFiles > 0) {
    parts.push('CI/CD configuration');
  }

  if (parts.length === 0) {
    return `Pull request "${title} introduces repository changes`;
  }

  return `Pull request "${title}" includes modifications to ${parts.join(', ')}.`;
}
