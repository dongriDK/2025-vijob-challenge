import { Repos } from "@/components/Repos";
import { fetchUser } from "@/util/api/githubAPI";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export type RepoPageType = {
  username: string;
  locale: string;
};
export const generateMetadata = async ({
  params,
}: {
  params: Promise<RepoPageType>;
}): Promise<Metadata> => {
  const username = (await params).username;
  return {
    title: `${username}`,
    description: `Github Repositories of ${username}`,
    openGraph: {
      title: `${username}`,
      description: `Github Repositories of ${username}`,
      type: "article",
      url: `https://github.com/${username}`,
    },
  };
};

const UserReposPage = async ({ params }: { params: Promise<RepoPageType> }) => {
  const username = (await params).username;
  const user = await fetchUser(username);
  if (!user) throw notFound();
  return <Repos username={username} user={user} />;
};

export default UserReposPage;
