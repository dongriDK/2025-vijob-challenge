import { RepoDetails } from "@/components/RepoDetails";
import { notFound } from "next/navigation";
import { RepoPageType } from "../page";
import { Metadata } from "next";

export type RepoDetailPageType = RepoPageType & {
  repo: string;
};
export const generateMetadata = async ({
  params,
}: {
  params: Promise<RepoDetailPageType>;
}): Promise<Metadata> => {
  const username = (await params).username;
  const repo = (await params).repo;
  return {
    title: `${username}-${repo}`,
    description: `Github Detail of ${username}-${repo}`,
    openGraph: {
      title: `${username}-${repo}`,
      description: `Github Detail of ${username}-${repo}`,
      type: "article",
      url: `https://github.com/${username}`,
    },
  };
};

const UserRepoDetailPage = async ({
  params,
}: {
  params: Promise<{ username: string; repo: string }>;
}) => {
  const username = (await params).username;
  const repo = (await params).repo;
  if (!username) throw notFound();
  if (!repo) throw notFound();

  return <RepoDetails username={username} repo={repo} />;
};

export default UserRepoDetailPage;
