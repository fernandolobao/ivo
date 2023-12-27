import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Input } from "./Input";
import { Weather } from "untitledui-js";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "Anything that satisfies `ReactNode`.",
      table: {
        defaultValue: { summary: "string" },
      },
    },
    disabled: {
      // options: [true],
      description: "Should this be disabled?",
      table: { defaultValue: { summary: false } },
      control: { type: "boolean" },
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Simple: Story = {
  args: {
    value: "Input",
    size: "md",
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    function onChange(str: string) {
      updateArgs({ value: str });
    }

    return (
      <Input {...args} onChange={(value) => onChange(value)} value={value} />
    );
  },
};

export const Helper: Story = {
  args: {
    value: "Input",
    size: "md",
    helper: <Weather.Lightning02 size="16px" />,
    variant: "primary",
  },
  parameters: {
    docs: {
      story: { inline: false },
      // canvas: { sourceState: "hide" },
    },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    function onChange(str: string) {
      updateArgs({ value: str });
    }

    return (
      <Input {...args} onChange={(value) => onChange(value)} value={value} />
    );
  },
};
