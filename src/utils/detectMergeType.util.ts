import { MergeType } from './types.js';

export function detectMergeType(message: string): MergeType {
  const lowerCaseMessage = message.toLowerCase();

  if (!lowerCaseMessage.startsWith('merge')) return 'none';

  if (
    lowerCaseMessage.includes('merge remote-tracking branch') ||
    lowerCaseMessage.includes('upstream/main') ||
    lowerCaseMessage.includes('origin/main')
  ) {
    return 'sync';
  }

  if (
    lowerCaseMessage.includes('pull request') ||
    lowerCaseMessage.includes('merge pull request')
  ) {
    return 'pull_request';
  }

  return 'unknown';
}
