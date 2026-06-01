const impactMappings = [
  {
    path: 'src/cache/',
    summary: 'Added or modified cache layer',
  },
  {
    path: 'src/resources/',
    summary: 'Added or modified MCP resources',
  },
  {
    path: 'src/resource-templates/',
    summary: 'Added or modified MCP resource templates',
  },
  {
    path: 'src/services/',
    summary: 'Modified service layer',
  },
  {
    path: 'src/tools/',
    summary: 'Added or modified MCP tools',
  },
  {
    path: 'src/utils/',
    summary: 'Modified utility functions and builders',
  },
  {
    path: 'src/formatters/',
    summary: 'Modified formatting layer',
  },
];

export function buildPullRequestImpactSummary(changedFilesNames: string[]): string[] {
  const impacts = new Set<string>();

  changedFilesNames.forEach((file) => {
    impactMappings.forEach(({ path, summary }) => {
      if (file.includes(path)) {
        impacts.add(summary);
      }
    });
  });

  return [...impacts];
}
