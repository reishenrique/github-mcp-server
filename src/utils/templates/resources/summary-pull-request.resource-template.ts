import { FormatSummarizePullRequestOutput } from '../../../types/summarize-pull-request.type.js';
import { buildPullRequestNarrativeSummary } from '../../builders/build-pull-request-narrative-summary.util.js';

export function buildPullRequestSummaryTemplate(data: {
  summary: FormatSummarizePullRequestOutput;
  risks: string;
  recommendations: string;
  maxFilesToShow: number;
  hasMoreFiles: boolean;
  changedFiles: string;
  generatedAt: string;
  impactSummary: string;
}): string {
  return `
Repository: ${data.summary.repository.owner}/${data.summary.repository.repositoryName}

Pull Request #${data.summary.pullRequest.number}
Title: ${data.summary.pullRequest.title}
State: ${data.summary.pullRequest.state}
Merged: ${data.summary.pullRequest.merged ? 'yes' : 'no'}
Author: ${data.summary.pullRequest.author}
Created At: ${data.summary.pullRequest.createdAt}

Metrics:
- Files changed: ${data.summary.metrics.totalFiles}
- Commits: ${data.summary.metrics.totalCommits}
- Additions: ${data.summary.metrics.additions}
- Deletions: ${data.summary.metrics.deletions}

Commit Insights:
- Feature commits: ${data.summary.commitsInsights.featureCommits}
- Merge commits: ${data.summary.commitsInsights.mergeCommits}
- Sync commits: ${data.summary.commitsInsights.syncCommits}

File Categories:
- Source files: ${data.summary.fileCategories?.sourceFiles}
- Test files: ${data.summary.fileCategories?.testsFiles}
- Documentation files: ${data.summary.fileCategories?.documentationFiles}
- CI files: ${data.summary.fileCategories?.ciFiles}
- Configuration files: ${data.summary.fileCategories?.configutarionFiles}
- Context files: ${data.summary.fileCategories?.contextFiles}

Summary:
${buildPullRequestNarrativeSummary(data.summary.pullRequest.title, data.summary.fileCategories)}

Impact Summary:
${data.impactSummary}

Risks: 
${data.risks}

Recommendations:
${data.recommendations}

Changed Files (showing ${Math.min(data.summary.changedFiles.length, data.maxFilesToShow)} of ${data.summary.changedFiles.length}):
${data.changedFiles}
${data.hasMoreFiles ? 'Additional files omitted for brevity.' : ''}

Summary generated at: ${data.generatedAt}

`.trim();
}
