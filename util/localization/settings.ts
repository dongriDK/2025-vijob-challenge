import type { InitOptions } from "i18next";

export const fallbackLng = "US";
export const Locales = [fallbackLng, "KR"] as const;
export type LocaleType = (typeof Locales)[number];
export const defaultNS = "common";
export type LanguagesType = { [key in LocaleType]: string };
export const Languages = {
  KR: "한국어",
  US: "English",
} as LanguagesType;
export const LanguageList = Object.keys(Languages) as LocaleType[];

export const getOptions = (lang = fallbackLng, ns = defaultNS): InitOptions => {
  return {
    // debug: process.env.NODE_ENV === "development",
    debug: false,
    supportedLngs: Locales,
    fallbackLng, // 번역 파일에서 찾을 수 없는 경우 기본 언어
    lng: lang, // 기본 설정 언어 (사용자가 선택한 언어가 없을 때 사용)
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      escapeValue: false, // HTML 태그나 특수 문자열 처리를 따로 하지 않도록 설정
    },
  };
};
