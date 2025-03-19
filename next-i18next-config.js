module.exports = {
  i18n: {
    locales: ["en", "ko"], // 지원할 언어
    defaultLocale: "ko", // 기본 언어
  },
  react: {
    useSuspense: false, // Suspense를 사용하지 않도록 설정
  },
  detection: {
    order: ["querystring", "cookie", "localStorage"], // 언어 감지 순서
    caches: ["cookie"], // 쿠키에 언어를 저장
  },
};
