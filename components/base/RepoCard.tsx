import { RepoType } from "@/util/api/githubAPI";
import { format, Locale } from "date-fns";
import { enUS, ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const RepoCard = ({
  props,
  username,
}: {
  props: RepoType;
  username: string;
}) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "KR" ? ko : enUS;
  // 날짜 포맷
  const formatDate = (dateString: string, lo: Locale) => {
    const date = new Date(dateString);

    const localeFormat: Record<string, string> = {
      ko: "yyyy년 MM월 dd일",
      "en-US": "MMM dd, yyyy",
    };
    const formattedDate = format(date, localeFormat[lo.code], { locale: lo });
    return t("detail.updated", { time: formattedDate });
  };

  return (
    <Link
      href={`/${username}/${encodeURI(props.name)}`}
      key={props.id}
      className="flex flex-col gap-2 p-5 transition-all bg-white rounded-lg hover:bg-PrimaryLight hover:shadow-lg dark:border-BorderDark dark:bg-CardDark dark:hover:bg-PrimaryDark group"
    >
      {/* 레포지토리 이름 */}
      <h2 className="text-lg font-bold">
        <span className="transition-colors text-Primary dark:text-DarkSubText dark:group-hover:text-Primary">
          {props.name}
        </span>
      </h2>

      {/* 레포지토리 설명 */}
      <span className="text-sm text-SubText line-clamp-2 dark:text-white">
        {props.description}
      </span>

      {/* Language, Stars, Forks */}
      <div className="dark:*:text-BorderDark">
        {props.language && <span className="mr-3">{props.language}</span>}
        <span className="mr-3">⭐ {props.stargazers_count}</span>
        <span>🍴 {props.forks_count}</span>
      </div>

      {/* 최신 업데이트 */}
      <p className="text-xs text-SubText dark:text-white">
        {formatDate(props.updated_at, locale)}
      </p>

      {/* 소유자 정보 */}
      <div className="flex items-center gap-2">
        <Image
          src={props.owner.avatar_url}
          alt={props.owner.login}
          width={24}
          height={24}
          className="rounded-full"
        />
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(`https://github.com/${props.owner.login}`, "_blank");
          }}
          className="text-sm text-SubText dark:text-BorderDark hover:underline"
        >
          @{props.owner.login}
        </span>
      </div>
    </Link>
  );
};
