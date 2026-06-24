import { Metrics } from '../../types/summarize-pull-request.type.js';
import { FileCategories } from './build-file-categories.utils.js';

export function buildReviewSignals(fileCategories: FileCategories, metrics: Metrics): string[] {
  const reviewSignals = [];

  const MAX_TOTAL_FILES_PER_PULL_REQUEST = 15;
  const MAX_TOTAL_COMMITS_PER_PULL_REQUEST = 15;

  const hasSource = fileCategories.sourceFiles > 0;
  const hasTests = fileCategories.testsFiles > 0;
  const hasCI = fileCategories.ciFiles > 0;
  const hasDocs = fileCategories.documentationFiles > 0;

  if (!hasTests) reviewSignals.push('No test files were modified');

  const isOnlySourceChanges = hasSource && !hasTests && !hasDocs && !hasCI;

  if (isOnlySourceChanges) {
    reviewSignals.push('Source code changes withou supporting tests, documentation, or CI updated');
  }

  const hasManyFiles = metrics.totalFiles > MAX_TOTAL_FILES_PER_PULL_REQUEST;
  if (hasManyFiles) reviewSignals.push('Large number of files changed');

  const hasManyCommits = metrics.totalCommits > MAX_TOTAL_COMMITS_PER_PULL_REQUEST;
  if (hasManyCommits) reviewSignals.push('High number of commits suggests iterative development');

  const affectsMultipleLayers = [hasSource, hasTests, hasCI, hasDocs].filter(Boolean).length >= 2;
  if (affectsMultipleLayers) reviewSignals.push('Changes affect multiple application layers');

  return reviewSignals;
}
