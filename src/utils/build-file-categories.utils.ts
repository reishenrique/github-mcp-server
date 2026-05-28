export type FileCategories = {
  sourceFiles?: number;
  testsFiles?: number;
  documentationFiles?: number;
  ciFiles?: number;
  configutarionFiles?: number;
  contextFiles?: number;
};

export function buildFileCategories(changedFilesNames: string[]): FileCategories {
  const categories = {
    source: 0,
    tests: 0,
    documentation: 0,
    ci: 0,
    configuration: 0,
    context: 0,
  };

  changedFilesNames.forEach((file) => {
    if (file.includes('/src/') || file.endsWith('.ts') || file.endsWith('.js')) {
      categories.source++;
    }

    if (file.includes('.test.') || file.includes('.spec.') || file.includes('/tests')) {
      categories.tests++;
    }

    if (file.includes('.md')) categories.documentation++;

    if (file.includes('.github/workflows')) categories.ci++;

    if (
      file.includes('package.json') ||
      file.includes('package-lock.json') ||
      file.includes('.yarnrc.yml') ||
      file.includes('yarn.lock') ||
      file.includes('.yaml') ||
      file.includes('.yml') ||
      file.includes('.xml')
    ) {
      categories.configuration++;
    }

    if (
      file.includes('CLAUDE.md') ||
      file.includes('CURSOR.md') ||
      file.includes('AGENTS.md') ||
      file.includes('PROJECT_KNOWLEDGE.md') ||
      file.includes('llm.txt') ||
      file.includes('agents.txt')
    ) {
      categories.context++;
    }
  });

  return {
    sourceFiles: categories.source,
    testsFiles: categories.tests,
    documentationFiles: categories.documentation,
    ciFiles: categories.ci,
    configutarionFiles: categories.configuration,
    contextFiles: categories.context,
  };
}
