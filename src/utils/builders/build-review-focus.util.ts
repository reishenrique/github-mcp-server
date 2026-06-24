const reviewFocusMappings = new Map<string, string>([
  [
    'Added or modified cache layer',
    'Verify cache consistency, invalidation strategy, and cache key generation',
  ],
  [
    'Added or modified MCP resources',
    'Review resource structure, URI patterns, and exposed context',
  ],
  [
    'Added or modified MCP resource templates',
    'Validate resource template formatting and generated output structure',
  ],
  [
    'Added or modified service layer',
    'Review business logic, data aggregation, and external integrations',
  ],
  [
    'Added or modified MCP tools',
    'Validate tool contracts, input validation, and output consistency',
  ],
  [
    'Modified utility functions and builders',
    'Review reusable utility logic and potential side effects',
  ],
  ['Modified formatting layer', 'Validate data transformation and output formatting behavior'],
]);

export function buildReviewFocus(impactSummary: string[]): string[] {
  const reviewFocus = new Set<string>();

  impactSummary.forEach((impact) => {
    const focus = reviewFocusMappings.get(impact);

    if (focus) {
      reviewFocus.add(focus);
    }
  });

  return [...reviewFocus];
}
