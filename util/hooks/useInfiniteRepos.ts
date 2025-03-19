import { useInfiniteQuery } from "@tanstack/react-query";
import { GET, REPOS } from "@/util/const";
import { fetchUserRepos } from "@/util/api/githubAPI";

export const useInfiniteRepos = (username: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [GET, REPOS, username],
    queryFn: ({ pageParam = 1 }) => fetchUserRepos(username, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
};
