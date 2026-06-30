const reviewChecklistMappings = new Map<string, string[]>([
  [
    'Verify cache consistency, invalidation strategy, and cache key generation',
    [
      'Validate cache invalidation logic',
      'Verify cache key generation',
      'Confirm cache consistency across operations',
      'Check cache behavior for stale or missing entries',
    ],
  ],
  [
    'Validate data transformation and output formatting behavior',
    [
      'Verify formatted output matches expected structure',
      'Review data transformation logic',
      'Validate handling of missing or invalid values',
      'Confirm response formatting consistency',
    ],
  ],
  [
    'Review resource structure, URI patterns, and exposed context',
    [
      'Validate resource URI template',
      'Verify exposed resource content',
      'Review resource output structure',
      'Confirm resource descriptions are accurate',
    ],
  ],
  [
    'Review business logic, data aggregation, and external integrations',
    [
      'Verify business rules implementation',
      'Review data aggregation logic',
      'Validate GitHub API integration',
      'Check error handling for external requests',
    ],
  ],
  [
    'Review reusable utility logic and potential side effects',
    [
      'Verify utility function behavior',
      'Check for unintended side effects',
      'Validate shared builder functions',
      'Review code reuse and consistency',
    ],
  ],
]);

export function buildReviewChecklist(reviewFocus: string[]): string[] {
  const checklist = new Set<string>();

  reviewFocus.forEach((focus) => {
    const tasks = reviewChecklistMappings.get(focus);

    tasks?.forEach((task) => {
      checklist.add(task);
    });
  });

  return [...checklist];
}
