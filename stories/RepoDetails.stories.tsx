import { getQueryClient } from "@/app/TanstackQueryProvider";
import { RepoDetails } from "@/components/RepoDetails";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof RepoDetails> = {
  title: "Components/RepoDetails",
  component: RepoDetails,
  decorators: [
    (Story) => (
      <QueryClientProvider client={getQueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    username: "dongri",
    repo: "Coder",
  },
};

export default meta;
type Story = StoryObj<typeof RepoDetails>;

export const Default: Story = {};
