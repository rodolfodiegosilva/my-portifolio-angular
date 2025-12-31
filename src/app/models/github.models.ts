export interface Repository {
  name: string;
  stars: number;
  forks: number;
  openIssues: number;
  html_url: string;
  description: string | null;
  updated_at: string;
}

export interface Activity {
  type: string;
  repo: { name: string };
  payload: unknown;
  created_at: string;
}

// Raw GitHub API response types (used internally by services)
export interface GitHubRepoResponse {
  name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  description: string | null;
  updated_at: string;
}

export interface GitHubEventResponse {
  type: string;
  repo: { name: string };
  payload: unknown;
  created_at: string;
}
