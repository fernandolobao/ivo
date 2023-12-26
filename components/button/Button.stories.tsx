import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Anything that satisfies `ReactNode`.",
      table: {
        defaultValue: { summary: "string" },
      },
    },
    variant: {
      options: ["primary", "secondary"],
      description: "Should this look like a `primary` or `secondary` variant?",
      table: { defaultValue: { summary: "primary" } },
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg", "xlg"],
      description:
        "How large should the button be? `small`, `medium`, `large` or `xlarge`?",
      table: { defaultValue: { summary: "medium" } },
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Button",
    size: "md",
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    size: "md",
    variant: "secondary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    size: "md",
    as: "link",
    href: "#",
    target: "_blank",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm",
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    size: "lg",
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};

export const XLarge: Story = {
  args: {
    children: "Button",
    size: "xlg",
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
};
