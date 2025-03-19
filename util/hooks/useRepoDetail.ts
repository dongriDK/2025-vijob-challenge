import { DETAIL, GET } from "@/util/const";
import { fetchRepoDetails } from "@/util/api/githubAPI";
import { useQuery } from "@tanstack/react-query";

export const useRepoDetail = (username: string, repo: string) => {
  return useQuery({
    queryKey: [GET, DETAIL, username, repo],
    queryFn: () => fetchRepoDetails(username, repo),
  });
};
