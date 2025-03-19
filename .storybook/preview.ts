import type { Preview } from "@storybook/react";
import "../app/globals.css";
import i18next from "@/util/localization/client";
import { Languages } from "@/util/localization/settings";
import { themes } from "@storybook/theming";

const preview: Preview = {
  initialGlobals: {
    locale: "US",
    locales: Languages,
  },
  parameters: {
    i18n: i18next,
    nextjs: {
      router: {
        basePath: "/US",
      },
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      stylePreview: true,
      current: "light",
      dark: { ...themes.dark },
      light: { ...themes.normal },
      darkClass: "dark",
      lightClass: "light",
    },
  },
};

export default preview;
