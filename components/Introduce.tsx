"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Introduce = () => {
  const { t } = useTranslation();
  const [introduce, setIntroduce] = useState<string>(
    "Please search for a Github user"
  );
  useEffect(() => {
    setIntroduce(t("base.introduce"));
  }, [t]);
  return (
    <div className="flex flex-col items-center gap-8 px-3 text-center py-36 md:px-0">
      <span className="text-xl">{introduce}</span>
    </div>
  );
};
