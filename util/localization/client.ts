"use client";

import i18next, { i18n } from "i18next";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { LocaleType, Locales, getOptions } from "@/util/localization/settings";
import { useEffect } from "react";

const runOnServerSide = typeof window === "undefined";
// i18next 설정
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: LocaleType, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: runOnServerSide ? "US" : localStorage.i18nextLng ?? "US", // 클라이언트에서 언어 감지
    detection: {
      order: ["path"],
    },
    preload: runOnServerSide ? Locales : [], // 서버에서 미리 로딩
  });

// 클라이언트에서 언어 변경
const useCustomTranslationImplement = (i18n: i18n, lng: LocaleType) => {
  useEffect(() => {
    if (!lng) return;
    i18n.changeLanguage(lng); // 언어 변경
  }, [lng, i18n]);
};

export const useTranslation = (lng: LocaleType, ns: string) => {
  const translator = useTransAlias(ns);
  const { i18n } = translator;

  if (runOnServerSide) {
    i18n.changeLanguage(lng); // 서버 사이드에서는 언어 변경
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplement(i18n, lng); // 클라이언트 사이드에서 언어 변경
  }
  return translator;
};

export const useTranslate = () => {
  const currentLanguage = i18next.language as LocaleType;
  return useTranslation(currentLanguage, "common");
};

export const useCurrentLocale = () => {
  return i18next.language as LocaleType;
};

export default i18next;
