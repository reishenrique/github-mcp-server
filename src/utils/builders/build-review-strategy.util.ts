const reviewStrategyMappings = new Map<string, string>([
  [
    'Review business logic, data aggregation, and external integrations',
    'Start by reviewing the service layer to understand the business behavior introduced by the pull request.',
  ],
  [
    'Verify cache consistency, invalidation strategy, and cache key generation',
    'Review cache interactions after validating the business logic to ensure consistency and correct invalidation.',
  ],
  [
    'Review reusable utility logic and potential side effects',
    'Inspect shared utilities and builders to identify regressions or unintended side effects across the codebase.',
  ],
  [
    'Validate data transformation and output formatting behavior',
    'Verify that data transformations and formatted outputs accurately represent the expected behavior.',
  ],
  [
    'Review resource structure, URI patterns, and exposed context',
    'Review exposed resources to confirm URI patterns, structure, and returned context are consistent.',
  ],
  [
    'Validate resource template formatting and generated output structure',
    'Validate generated resource templates to ensure the rendered output is complete, readable, and correctly formatted.',
  ],
  [
    'Validate tool contracts, input validation, and output consistency',
    'Finish by validating tool contracts, input validation, and output consistency to ensure reliable integrations.',
  ],
]);

const reviewStrategyOrder = [
  'Review business logic, data aggregation, and external integrations',
  'Verify cache consistency, invalidation strategy, and cache key generation',
  'Review reusable utility logic and potential side effects',
  'Validate data transformation and output formatting behavior',
  'Review resource structure, URI patterns, and exposed context',
  'Validate resource template formatting and generated output structure',
  'Validate tool contracts, input validation, and output consistency',
];

export function buildReviewStrategy(reviewFocus: string[]): string[] {
  const reviewFocusSet = new Set(reviewFocus);
  const reviewStrategy: string[] = [];

  for (const focus of reviewStrategyOrder) {
    if (!reviewFocusSet.has(focus)) continue;

    const strategy = reviewStrategyMappings.get(focus);

    if (strategy) reviewStrategy.push(strategy);
  }

  return reviewStrategy;
}
