import { FormatSummarizePullRequestOutput } from '../../../types/summarize-pull-request.type.js';
import { buildBulletList } from '../../builders/build-bullet-list.util.js';

export function buildPullRequestDescriptionTemplate(data: {
  summary: FormatSummarizePullRequestOutput;
  impactSummary: string[];
  risks: string;
  recommendations: string;
}) {
  return `
## 📋 Pull Request Summary

### Impact Summary

${buildBulletList(data.impactSummary, 'No significant impact from this pull request')}

### Metrics

- Files changed: ${data.summary.metrics.totalFiles}
- Commits: ${data.summary.metrics.totalCommits}
- Additions: ${data.summary.metrics.additions}
- Deletions: ${data.summary.metrics.deletions}

### Commit Insights

- Feature commits: ${data.summary.commitsInsights.featureCommits}
- Merge commits: ${data.summary.commitsInsights.mergeCommits}
- Sync commits: ${data.summary.commitsInsights.syncCommits}

### Risks

${data.risks}

### Recommendations

${data.recommendations}

---
Generated automatically by GitHub MCP Server
`.trim();
}
