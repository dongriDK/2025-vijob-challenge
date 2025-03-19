import { ISSUES, GET } from "@/util/const";
import { fetchRepoIssues } from "@/util/api/githubAPI";
import { useQuery } from "@tanstack/react-query";

export const useRepoIssues = (username: string, repo: string) => {
  return useQuery({
    queryKey: [GET, ISSUES, username, repo],
    queryFn: () => fetchRepoIssues(username, repo),
  });
};
