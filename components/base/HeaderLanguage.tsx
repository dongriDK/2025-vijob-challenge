import { useCurrentLocale } from "@/util/localization/client";
import {
  LanguageList,
  Languages,
  LocaleType,
} from "@/util/localization/settings";
import i18next from "i18next";
import { Earth } from "lucide-react";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";

export const HeaderLanguage = () => {
  const [currentLang, setCurrentLang] = useState<LocaleType>("US");
  useCurrentLocale();

  useEffect(() => {
    setCurrentLang(i18next.language as LocaleType);
  }, []);

  const languageChangeHandler = (lang: LocaleType) => {
    i18next.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <Dropdown
      trigger={
        <>
          <span className="hidden lg:block">{Languages[currentLang]}</span>
          <Earth className="size-7" />
        </>
      }
      triggerClassName="gap-3 bg-PrimaryLight dark:bg-PrimaryDark text-Primary"
      options={LanguageList}
      items={(option) => (
        <button
          key={option}
          className="rounded-md hover:bg-Border dark:hover:bg-transparent hover:text-DarkSubText"
          onClick={() => languageChangeHandler(option)}
        >
          {Languages[option]}
        </button>
      )}
      itemsClassName="*:p-2"
    />
  );
};
