export type CommitFiles = {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url?: string;
  raw_url?: string;
  contents_url?: string;
  patch?: string;
};

type FormattedCommitFile = Pick<
  CommitFiles,
  'sha' | 'status' | 'additions' | 'deletions' | 'changes'
> & {
  fileName: string;
};

export type FormattedCommitFilesOutput = {
  totalFiles: number;
  files: FormattedCommitFile[];
};
