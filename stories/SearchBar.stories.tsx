import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "@/components/SearchBar";
import { within, userEvent } from "@storybook/test";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchButton = canvas.getByRole("button", { name: /Search|검색/i });
    await userEvent.click(searchButton);
  },
};
