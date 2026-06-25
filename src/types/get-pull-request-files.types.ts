export type CommitFilesData = {
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

type CommitFile = Pick<
  CommitFilesData,
  'sha' | 'status' | 'additions' | 'deletions' | 'changes'
> & {
  fileName: string;
};

export type CommitFilesOutput = {
  totalFiles: number;
  filesNames: CommitFile[];
};
