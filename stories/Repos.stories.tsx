import { getQueryClient } from "@/app/TanstackQueryProvider";
import { Repos } from "@/components/Repos";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof Repos> = {
  title: "Components/Repos",
  component: Repos,
  decorators: [
    (Story) => (
      <QueryClientProvider client={getQueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    username: "dongriDK",
    user: {
      login: "123",
      id: 456,
      avatar_url: "https://avatars.githubusercontent.com/u/45909972?s=48&v=4",
      public_repos: 5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Repos>;

export const Default: Story = {};
