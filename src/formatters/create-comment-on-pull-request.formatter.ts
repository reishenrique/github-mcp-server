import {
  CommentOnPullRequestData,
  CommentOnPullRequestOutput,
} from '../types/create-comment-on-pull-request.types.js';

export function createCommentOnPullRequestOutput(
  commentData: CommentOnPullRequestData,
): CommentOnPullRequestOutput {
  const formattedCommentOnPullRequestOutput = {
    pullRequestUrl: commentData.url,
    issueUrl: commentData.issue_url,
    user: commentData.user.login,
    createdAt: commentData.created_at,
    body: commentData.body,
  };

  return formattedCommentOnPullRequestOutput;
}
