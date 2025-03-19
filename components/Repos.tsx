"use client";

import { useInfiniteRepos } from "@/util/hooks/useInfiniteRepos";
import { notFound } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Filter, X } from "lucide-react";
import { UserType } from "@/util/api/githubAPI";
import { Dropdown } from "./base/Dropdown";
import { ChevronDown } from "lucide-react";
import { LanguageOptions } from "@/util/const";
import { RepoCard } from "./base/RepoCard";
import { useTranslation } from "react-i18next";

export const Repos = ({
  username,
  user,
}: {
  username: string;
  user: UserType;
}) => {
  const { t } = useTranslation();
  const { data, fetchNextPage, hasNextPage, isFetching, error } =
    useInfiniteRepos(username);
  const { ref, inView } = useInView();

  // 다국어 지원을 위한 상태값
  const [languageText, setLanguageText] = useState<string>("Language");
  const [sText, setSText] = useState<string>("'s");

  // 필터링을 위한 상태값
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortList, setSortList] = useState<string[]>([]);
  const [sort, setSort] = useState("Recently Updated");

  // 필터 토글 (언어 필터 추가/삭제)
  const toggleFilter = (language: string) => {
    if (language === "All") {
      setSelectedFilters([]); // All 선택하면 모든 필터 해제
    } else {
      setSelectedFilters(
        (prev) =>
          prev.includes(language)
            ? prev.filter((f) => f !== language) // 이미 선택된 필터면 제거
            : [...prev.filter((f) => f !== "All"), language] // 선택되지 않은 필터면 추가
      );
    }
  };

  // 필터 삭제
  const deleteFilter = (language: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== language));
  };

  // 정렬 옵션 변경 핸들러
  const sortHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSort(e.currentTarget.innerText);
  };

  // 필터링된 레포지토리 목록
  const filteredRepos = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((repos) =>
      repos.filter(
        (repo) =>
          selectedFilters.length === 0 ||
          selectedFilters.includes("All") ||
          selectedFilters.includes(repo.language)
      )
    );
  }, [data, selectedFilters]);

  // 정렬된 레포지토리 목록
  const sortedRepos = useMemo(() => {
    return [...filteredRepos].sort((a, b) => {
      if (sort === t("repo.sort.updated")) {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime() // 최신 업데이트 순
        );
      }
      if (sort === t("repo.sort.stars")) {
        return b.stargazers_count - a.stargazers_count; // 별 개수 순
      }
      if (sort === t("repo.sort.forks")) {
        return b.forks_count - a.forks_count; // 포크 개수 순
      }
      return 0;
    });
  }, [filteredRepos, sort]);

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView]);

  // 언어 변경시 텍스트 업데이트
  useEffect(() => {
    setLanguageText(t("repo.filterLanguage"));
    setSText(t("repo.s"));

    setSortList((prev) => {
      const newSortList = Object.values(
        t("repo.sort", { returnObjects: true })
      );
      const index = prev.findIndex((s) => s === sort);
      const newSort = newSortList[index] || newSortList[0];
      setSort(newSort);
      return newSortList;
    });
  }, [t]);

  if (error?.message === "404") {
    return notFound();
  }

  return (
    <div className="py-3 space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        {/* 필터 드롭다운 */}
        <Dropdown
          trigger={
            <>
              <Filter className="mr-2 size-5" />
              <span>{languageText}</span>
            </>
          }
          triggerClassName="cursor-pointer flex px-3 py-2 bg-PrimaryLight rounded-lg *:text-Primary items-center hover:bg-Primary/10 transition-colors dark:bg-PrimaryDark"
          options={LanguageOptions}
          align="left"
          items={(option) => (
            <button
              key={option}
              className={`hover:bg-Border dark:hover:bg-transparent hover:text-DarkSubText rounded-md ${
                selectedFilters.includes(option)
                  ? "text-Primary dark:text-DarkSubText"
                  : "text-SubText"
              }`}
              onClick={() => toggleFilter(option)}
            >
              {option}
            </button>
          )}
        />

        {/* 선택된 필터 표시 */}
        {selectedFilters.map((language) => (
          <div
            className="flex items-center border-Primary border rounded-lg px-3 py-2 *:text-Primary dark:bg-PrimaryDark dark:border-DarkSubText dark:*:text-DarkSubText"
            key={language}
          >
            <span>{language}</span>
            <X
              className="ml-2 cursor-pointer size-5"
              onClick={() => deleteFilter(language)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full dark:*:text-white">
        <div>
          <span className="text-xl font-bold">{username}</span>
          <span className="mr-2">{sText}</span>
          <span>
            Repositories (
            {selectedFilters.length === 0
              ? user.public_repos || 0
              : sortedRepos.length}
            )
          </span>
        </div>
        {/* 정렬 드롭다운 */}
        <Dropdown
          trigger={
            <>
              <span>{sort}</span>
              <ChevronDown className="size-5" />
            </>
          }
          triggerClassName="gap-3 hover:bg-SubText/10 "
          options={sortList}
          items={(option) => (
            <button
              key={option}
              onClick={sortHandler}
              className="rounded-md hover:bg-Border dark:hover:bg-transparent hover:text-DarkSubText"
            >
              {option}
            </button>
          )}
          itemsClassName="*:p-2 min-w-max"
        />
      </div>
      {/* 레포지토리 리스트 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedRepos.map((repo) => (
          <RepoCard key={repo.id} props={repo} username={username} />
        ))}
        {sortedRepos.length === 0 && !isFetching && (
          <p className="text-SubText">{t("repo.noResult")}</p>
        )}
        {isFetching && ReposSkeleton()}
      </div>

      {/* 에러 메시지 */}
      {error?.message && <p className="text-red-400">{error.message}</p>}

      {/* 무한스크롤 트리거 */}
      <div ref={ref} className="h-10" />
    </div>
  );
};

const ReposSkeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="rounded-lg h-52 bg-Placeholder dark:bg-BackgroundDark animate-pulse"
    />
  ));
};
