const githubLinkRegex = /^https?:\/\/github\.com.*/i;

export function validateGithubLink(string: string): boolean {
  return !!string.match(githubLinkRegex);
}
