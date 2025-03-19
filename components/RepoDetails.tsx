"use client";
import { useRepoDetail } from "@/util/hooks/useRepoDetail";
import { formatDistanceToNow, format, Locale } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRepoIssues } from "@/util/hooks/useRepoIssues";
import LI from "@/public/li.svg";
import { notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { enUS, ko } from "date-fns/locale";

export const RepoDetails = ({
  username,
  repo,
}: {
  username: string;
  repo: string;
}) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "KR" ? ko : enUS;
  const {
    data: rep,
    isLoading: repLoading,
    error: repError,
  } = useRepoDetail(username, repo);
  const {
    data: iss,
    isLoading: issLoading,
    error: issError,
  } = useRepoIssues(username, repo);

  // 오픈 이슈 날짜 포맷
  const formatDate = (dateString: string, lo: Locale) => {
    const date = new Date(dateString);

    const localeFormat: Record<string, string> = {
      ko: "yyyy년 MM월 dd일",
      "en-US": "MMM dd, yyyy",
    };
    const formattedDate = format(date, localeFormat[lo.code], { locale: lo });
    return t("detail.open", { time: formattedDate });
  };

  if (repError?.message === "404") {
    return notFound();
  }

  return (
    <div className="max-w-4xl p-4 mx-auto pt-14">
      <div className="flex flex-col gap-5 p-4 bg-white rounded-lg dark:bg-CardDark">
        {repLoading && RepoDetailSkeleton()}
        {repError?.message && (
          <p className="text-red-400">{repError.message}</p>
        )}
        {/* 레포지토리 상세 정보 */}
        {rep && (
          <>
            <div className="flex justify-between">
              <span className="text-xl font-bold dark:text-white">
                {rep?.name}
              </span>
              {rep?.updated_at && (
                <span className="text-xs text-SubText dark:text-BorderDark">
                  {t("detail.updated", {
                    time: formatDistanceToNow(rep.updated_at, {
                      addSuffix: true,
                      locale,
                    }),
                  })}
                </span>
              )}
            </div>
            {rep?.language && (
              <div className="text-Language dark:text-BorderDark">
                <span>{t("detail.primaryLang")}</span>
                <span className="ml-5 font-bold">{rep.language}</span>
              </div>
            )}
            <span className="text-SubText dark:text-white">
              {rep?.description}
            </span>
            <div className="flex flex-wrap items-end justify-between gap-y-3">
              <div className="inline-flex gap-5 dark:text-white">
                <div className="flex items-center gap-2">
                  {rep?.owner && (
                    <Image
                      src={rep.owner.avatar_url}
                      alt={rep.owner.login}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>@{rep?.owner.login}</span>
                </div>
                <span>⭐ {rep?.stargazers_count}</span>
                <span>🍴 {rep?.forks_count}</span>
              </div>
              <Link
                href={`https://github.com/${rep?.owner.login}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 rounded-full bg-Primary hover:bg-Primary/80"
              >
                <span>{t("detail.goto")}</span>
                <SquareArrowOutUpRight className="size-5" />
              </Link>
            </div>
          </>
        )}

        {/* 구분선 */}
        <div className="w-full h-px bg-Border" />

        {/* 오픈 이슈 */}
        <div className="flex items-center gap-2 text-Language dark:text-white">
          <span className="relative rounded-full size-5 bg-Primary before:absolute before:content-['i'] before:text-white dark:before:text-CardDark before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-10 " />
          Open Issues {rep?.open_issues_count && `(${rep?.open_issues_count})`}
        </div>
        {issLoading && <Skeleton className="h-11" />}
        {issError?.message && (
          <p className="text-red-400">{issError.message}</p>
        )}
        {iss?.map((issue) => (
          <div key={issue.title} className="flex gap-3">
            <Image src={LI} alt="issue" width={16} height={16} />
            <div className="flex flex-col">
              <Link
                href={issue.html_url}
                target="_blank"
                className="underline-offset-4 hover:underline hover:text-Primary dark:text-white"
              >
                {issue.title}
              </Link>
              <div className="flex items-center gap-1 text-sm text-SubText dark:text-BorderDark">
                <span>#{issue.number} · </span>
                <Link
                  href={`https://github.com/${issue.user.login}`}
                  target="_blank"
                  className="transition-colors underline-offset-4 hover:underline hover:text-Language dark:hover:text-white"
                >
                  {issue.user.login}
                </Link>
                <span>{formatDate(issue.created_at, locale)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RepoDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-7" />
      <Skeleton className="h-6" />
      <Skeleton className="h-6" />
      <Skeleton className="h-10" />
    </div>
  );
};

export const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`${className} rounded-lg bg-Placeholder dark:bg-BackgroundDark animate-pulse`}
  ></div>
);
