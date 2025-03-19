const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type OwnerType = {
  login: string;
  avatar_url: string;
};
export type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  public_repos: number;
};

export type RepoType = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  owner: OwnerType;
};

export type RepoDetailType = {
  name: string;
  language: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  owner: OwnerType;
  open_issues_count: number;
};

export type RepoIssueType = {
  id: number;
  title: string;
  state: string;
  created_at: string;
  html_url: string;
  number: number;
  user: OwnerType;
};

export const fetchUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 * 5 },
  });
  const data = await res.json();
  if (!res.ok) {
    return data.status || data.message;
  }
  return data as UserType;
};

export const fetchUserRepos = async (username: string, page: number = 1) => {
  await delay(500);
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`,
    {
      next: { revalidate: 60 * 5 },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.status || data.message);
  }
  return data as RepoType[];
};

export const fetchRepoDetails = async (username: string, repo: string) => {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
    next: { revalidate: 60 * 5 },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.status || data.message);
  return data as RepoDetailType;
};

export const fetchRepoIssues = async (username: string, repo: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/issues`,
    {
      next: { revalidate: 60 * 5 },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.status || data.message);
  return data as RepoIssueType[];
};
